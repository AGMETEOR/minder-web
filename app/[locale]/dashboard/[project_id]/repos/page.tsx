'use client'
import Table from '@/components/table';
import { useStore } from '@/store';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Repos(){
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
						action: 'Add to minder',
						icon: <FontAwesomeIcon icon={faEdit}/>,
						actionFunc: () => {
							addRepoToControlPlane(data.owner, data.repoId, data.name)
						}
					}
				],
			}
		})

		const tableData = {
			titles: ['Name', 'Owner'],
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
						action: 'Remove from minder',
						icon: <FontAwesomeIcon icon={faEdit}/>,
						actionFunc: () => {
							addRepoToControlPlane(data.owner, data.repoId, data.name)
						}
					}
				],
			}
		})

		const tableData = {
			titles: ['Name', 'Owner', 'Provider'],
			body,
		}; 

		return tableData;
	}

	return (
		<div>
		<Table
				tableTitle="Your remote provider repositories"
				searchPlaceholder="Search remote repos"
				data={convertRemoteReposToTableData(remoteRepos.slice(0, 8))}/>
		<Table
				tableTitle="Your minder repositories"
				searchPlaceholder="Search repos"
				data={convertLocalReposToTableData(localRepos)}/>
		</div>
	)
}
