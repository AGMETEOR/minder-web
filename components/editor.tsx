'use client'
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import Modal from './modal';
import { Options } from './table';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseYaml } from '@/utils/general';
import yaml from 'js-yaml';
import { createProfileScafoldWithRule } from '@/constants/yaml';
import { useStore } from '@/store';
import { useTranslations } from 'next-intl';

export enum Mode {
  V = 'View',
  C = 'Create',
  E = 'Edit'
}

export enum Resource {
  P = 'Profiles',
  R = 'Rules'
}

type Props = {
    resource: Resource;
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
  const t = useTranslations("Editor")
  const rules = useStore((state) => state.projectRules);
  return (
    <div className='w-full'>
      {rules.map((rule: any) => {
        return (
          <div className="flex justify-between items-center bg-white border-b border-t py-5 z-50">
          <div>{rule.name}</div>
          <Options actions={[
          {
            action: t('addRule'),
            icon: <FontAwesomeIcon icon={faPlus}/>,
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
  const t = useTranslations("Editor");
  const tRules = useTranslations("Rules")
  const [val, setVal] = useState(props.defaultVal);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setVal(props.defaultVal);
  }, [props.defaultVal])

  useEffect(() => {
    if (monaco && editorRef.current && (props.resource === Resource.P)) {
      addRulesAction(editorRef.current as editor.IStandaloneCodeEditor , monaco);
    }
  }, [editorRef, monaco, props.resource]);

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
          label: t('viewRules'),
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
        <button className='my-btn-no-background' onClick={() => props.closeFunc()}>{t('close')}</button>
        <button onClick={() => save()} className={`my-btn-small text-white ${disabeSaveBtn ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-stacklok-minder-blue'}`} disabled={disabeSaveBtn}>{t('save')}</button>
        <button onClick={() => saveClose()} className={`my-btn-small text-white ${disabeSaveBtn ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-stacklok-minder-blue'}`}>{t('saveclose')}</button>
      </div>
      <Modal
      title={tRules('viewYourRules')}
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