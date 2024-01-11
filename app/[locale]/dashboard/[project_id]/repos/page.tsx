'use client'
import Table from '@/components/table';
import { useStore } from '@/store';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

export default function Repos(){
	const t = useTranslations('Repos')
	const localRepos = useStore((state) => state.localRepos);
	const remoteRepos = useStore((state) => state.remoteRepos);
	const addToLocalRepos = useStore((state) => state.addToLocalRepos);

	const addRepoToControlPlane = async (owner: string, repo_id: string, name: string) => {
		addToLocalRepos(owner, repo_id, name);
	}

	const convertRemoteReposToTableData = (repoData: any) => {
		const body = repoData.map((data:any) => {
			return {
				id: data.repoId,
				name: data.name,
				owner: data.owner,
				actions: [
					{
						action: t('addMinder'),
						icon: <FontAwesomeIcon icon={faPlus}/>,
						actionFunc: () => {
							addRepoToControlPlane(data.owner, data.repoId, data.name)
						}
					}
				],
			}
		})

		const tableData = {
			titles: [t('name'), t('owner')],
			body,
		}; 

		return tableData;
	}

	const convertLocalReposToTableData = (repoData: any) => {
		const body = repoData.map((data:any) => {
			return {
				id: data.repoId,
				name: data.name,
				owner: data.owner,
				provider: data.context.provider,
				actions: [
					{
						action: t('removeMinder'),
						icon: <FontAwesomeIcon icon={faTrash}/>,
						actionFunc: () => {
							addRepoToControlPlane(data.owner, data.repoId, data.name)
						}
					}
				],
			}
		})

		const tableData = {
			titles: [t('name'), t('owner'), t('provider')],
			body,
		}; 

		return tableData;
	}

	return (
		<div>
		<Table
				tableTitle={t('remoteRepos')}
				searchPlaceholder={t('searchRemote')}
				data={convertRemoteReposToTableData(remoteRepos.slice(0, 8))}/>
		<Table
				tableTitle={t('localRepos')}
				searchPlaceholder={t('search')}
				data={convertLocalReposToTableData(localRepos)}/>
		</div>
	)
}
