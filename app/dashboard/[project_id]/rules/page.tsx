'use client'
import Editor, { Mode } from '@/components/editor';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import yaml from 'js-yaml';
import Table from '@/components/table';
import { useStore } from '@/store';

export default function Rules(){
	const rules = useStore((state) => state.projectRules);
	const addRuleToControlPlane = useStore((state) => state.addRuleToControlPlane);
	
	const [defaultVal, setDefaultVal] = useState('---');
	const [showEditor, setShowEditor] = useState(false);
	const [editorMode, setEditorMode] = useState(Mode.C);

	const saveRuleTypeToControlPlane = async (val: string) => {
		addRuleToControlPlane(val);
	}

	const convertRulesToTableData = (rules: any) => {
		const body = rules.map((rulesItem:any) => {
			return {
				id: rulesItem.id,
				name: rulesItem.name,
				provider: rulesItem.context.provider,
				actions: [
					{
						action: 'View',
						icon: <FontAwesomeIcon icon={faEdit}/>,
						actionFunc: () => {
							const orderedRuleDef = {
								version: 'v1',
								type: 'rule-type',
								name: rulesItem.name,
								context: {
									provider: rulesItem.context.provider,
								},
								description: rulesItem.description,
								guidance: rulesItem.guidance,
								def: rulesItem.def,
							}
							const yamlString = yaml.dump(orderedRuleDef);
							setEditorMode(Mode.V);
							setDefaultVal('---\n' + yamlString);
							setShowEditor(true);
						}
					}
				],

			}
		})

		const tableData = {
			titles: ['Name', 'Provider'],
			body,
		}; 

		return tableData;
	}

	return (
		<div className="">
			<Table
				tableTitle="Your rules types"
				searchPlaceholder="Search rules"
				createFunc={() => {
					setEditorMode(Mode.C);
					setDefaultVal('---');
					setShowEditor(true);
				}} 
				data={convertRulesToTableData(rules)}/>
			<div>
				{
					showEditor && (
						<Editor
						mode={editorMode} 
						defaultVal={defaultVal}
						saveFunc={saveRuleTypeToControlPlane}
						closeFunc={() => setShowEditor(false)} />
					)
				}
			</div>
		</div>
	)
}
