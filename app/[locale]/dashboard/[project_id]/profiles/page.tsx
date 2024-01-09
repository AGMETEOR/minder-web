'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Editor, { Mode } from '@/components/editor';
import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import Table from '@/components/table';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { useStore } from '@/store';
import { useTranslations } from 'next-intl';

export default function Profiles(){
	const t = useTranslations("Profiles");
	const profiles = useStore((state) => state.projectProfiles);
	const addProfileToControlPlane = useStore((state) => state.addProfileToControlPlane);

	const [defaultVal, setDefaultVal] = useState('---');
	const [showEditor, setShowEditor] = useState(false);
	const [editorMode, setEditorMode] = useState(Mode.C);

	const saveProfileToControlPlane = async (val: string) => {
		addProfileToControlPlane(val);
	}

	const convertProfilesToTableData = (profiles: any) => {
		const body = profiles.map((profile:any) => {
			return {
				id: profile.id,
				name: profile.name,
				provider: profile.context.provider,
				alert: profile.alert,
				remediate: profile.remediate,
				actions: [
					{
						action: t('view'),
						icon: <FontAwesomeIcon icon={faEdit}/>,
						actionFunc: () => {
							const orderedRuleDef = {
								version: 'v1',
								type: 'profile',
								name: profile.name,
								context: {
									provider: profile.context.provider,
								},
								...profile
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
			titles: [t('name'), t('provider'), t('alert'), t('remediate')],
			body,
		}; 

		return tableData;
	}

	return (
		<div>
			<Table
				tableTitle={t('title')}
				searchPlaceholder={t('search')}
				createFunc={() => {
					setEditorMode(Mode.C);
					setDefaultVal('---');
					setShowEditor(true);
				}} 
				data={convertProfilesToTableData(profiles)}/>
			<div>
				{
					showEditor && (
						<Editor
						mode={editorMode} 
						defaultVal={defaultVal}
						saveFunc={saveProfileToControlPlane}
						closeFunc={() => setShowEditor(false)} />
					)
				}
			</div>			
		</div>
	)
}