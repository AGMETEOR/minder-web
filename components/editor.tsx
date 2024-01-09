'use client'
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import Modal from './modal';
import { Options } from './table';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseYaml } from '@/utils/general';
import yaml from 'js-yaml';
import { createProfileScafoldWithRule } from '@/constants/yaml';
import { useStore } from '@/store';

export enum Mode {
  V = 'View',
  C = 'Create',
  E = 'Edit'
}

type Props = {
    defaultVal: any;
    mode: Mode;
    saveFunc: (val: any) => Promise<void>
    closeFunc: () => void;
}

type RulesListType = {
  editorVal: any;
  setVal: (x:string) => void;
}

type ProfileRuleDefinition = {
  type: string;
  def: {
    enabled: boolean;
  }
}

const RulesList = (props: RulesListType) => {
  const rules = useStore((state) => state.projectRules);
  return (
    <div className='w-full'>
      {rules.map((rule: any) => {
        return (
          <div className="flex justify-between items-center bg-white border-b border-t py-5 z-50">
          <div>{rule.name}</div>
          <Options actions={[
          {
            action: 'Add rule',
            icon: <FontAwesomeIcon icon={faEdit}/>,
            actionFunc: () => {
              const profile: any = parseYaml(props.editorVal);
              if (profile) {
                const profileDeepCopy = JSON.parse(JSON.stringify(profile));
                const profileRules = profileDeepCopy.repository as ProfileRuleDefinition[];
                if (profileRules && profileRules.length > 0 ) {
                  const ruleExists = profileRules.some(r => r.type === rule.name);
                  if (!ruleExists) {
                    profileRules.push({
                      type: rule.name,
                      def: {
                        enabled: true,
                      }
                    })
                  }
                }

                props.setVal(yaml.dump(profileDeepCopy));
              }
              
              const scafold = createProfileScafoldWithRule(rule.name);
              props.setVal(scafold);
            }
          }
        ]}/>
        </div>
        )
      })}

    </div>
  )
}

export default function Editor(props: Props) {
  const [val, setVal] = useState(props.defaultVal);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setVal(props.defaultVal);
  }, [props.defaultVal])

  useEffect(() => {
    if (monaco && editorRef.current) {
      addRulesAction(editorRef.current as editor.IStandaloneCodeEditor , monaco);
    }
  }, [editorRef, monaco]);

  const save = async () => {
    await props.saveFunc(val);
  }

  const saveClose = async () => {
    await save();
    props.closeFunc();
  }

  const onChange = (val: any) => {
    setVal(val);
  }

  const disabeSaveBtn = props.mode === Mode.V;

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
    setMonaco(monaco);
  }

   function addRulesAction (editor: editor.IStandaloneCodeEditor, monaco: Monaco){
        editor.addAction({
          id: "view-rules-action",
          label: "View rules",
          keybindings: [
            monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
            // chord
            monaco.KeyMod.chord(
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyM
            ),
          ],
        
          // A precondition for this action.
          // precondition: null,
        
          // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
          // keybindingContext: null,
        
          contextMenuGroupId: "navigation",
        
          contextMenuOrder: 1.5,
        
          // Method that will be executed when the action is triggered.
          // @param editor The editor instance is passed in as a convenience
          run: function (ed) {
            // alert("i'm running => " + ed.getPosition());
            setOpenModal(!openModal);
          },
        });
  }

  return (
    <div className='relative mt-10'>
      <div className="flex justify-end gap-2 bg-[#EBE0FF] p-2">
        <button onClick={() => props.closeFunc()}>Close</button>
        <button onClick={() => save()} className={`${disabeSaveBtn ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-blue-500'} hover:bg-blue-700 text-white py-1 px-2`} disabled={disabeSaveBtn}>Save</button>
        <button onClick={() => saveClose()} className={`${disabeSaveBtn ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-blue-500'} hover:bg-blue-700 text-white py-1 px-2`}>Save and Close</button>
      </div>
      <Modal
      title="View your rules"
      open={openModal} 
      onClose={() => setOpenModal(!openModal)}
      primaryFunc={() => {}}
      secondaryFunc={() => setOpenModal(!openModal)}
      >
        <RulesList setVal={setVal} editorVal={val}/>
      </Modal>
      <MonacoEditor
        onMount={handleEditorDidMount}
        theme="vs-dark" 
        height="50vh" 
        defaultLanguage="yaml"
        value={val}
        onChange={onChange}/>
    </div>
  )
}