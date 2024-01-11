import { create } from 'zustand';
import { CurrentUser, MinderContext, Project, User } from './types';
import { parseYaml } from './utils/general';

type GlobalState = {
    minderContext: MinderContext;
    currentProject: Project;
    currentUser: CurrentUser;
    projects: Project[];
    projectRules: any[];
    projectProfiles: any[];
    remoteRepos: any[];
    localRepos: any[];
    errorBannerMessage?: string;
    setErrorBannerMessage: (msg: string) => void;
    setMinderContext: (projectID: string, access_token: string, provider: string) => void;
    setProjects: (projects: Project[]) => void;
    setCurrentUser: (user: CurrentUser) => void;
    addToLocalRepos: (owner: string, repo_id: string, name: string) => void;
    addRuleToControlPlane: (ruleData: string) => void;
    addProfileToControlPlane: (ruleData: string) => void;
    fetchData: (projectID: string, access_token: string) => void;
}

const initialCurrentProject: Project = {
    projectId: '',
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
}

const initialUser: CurrentUser = {
    id: 0,
    name: '',
    email: '',
}

const initialMinderContext: MinderContext = {
    provider: 'github',
    projectId: '',
    accessToken: '',
}

export const useStore = create<GlobalState>((set, get) => ({
    minderContext: {...initialMinderContext},
    projects: [],
    currentProject: {...initialCurrentProject},
    currentUser: {...initialUser},
    projectRules: [],
    projectProfiles: [],
    remoteRepos: [],
    localRepos:[],
    setErrorBannerMessage: (msg: string) => {
        set({errorBannerMessage: msg});
    },
    setMinderContext: (projectId: string, accessToken: string, provider: string) => {
        set({minderContext: {projectId, provider, accessToken}});
    },
    setCurrentUser: (user: CurrentUser) => {
        set({currentUser: user});
    },
    setProjects: (projects: Project[]) => {
        set({projects})
    },
    addRuleToControlPlane: async (ruleData: string) => {
        const context = get().minderContext;
        const ruleType = parseYaml(ruleData);
		const body = JSON.stringify({
			context: {
				project_id: context.projectId,
				provider: context.provider,
			},
			ruleType,
		})
		
		const response = await fetch('/api/rules/create', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `bearer ${context.accessToken}`,
			  }),
			body,
		})

        const createdRuleData = await response.json();
        const rule = createdRuleData.ruleType;
        set((state) => ({
            projectRules: [
                ...state.projectRules,
                rule,
            ]
        }))
    },
    addProfileToControlPlane: async (profileData: string) => {
        const context = get().minderContext;
        const profile = parseYaml(profileData);
		const body = JSON.stringify({
			context: {
				project_id: context.projectId,
				provider: context.provider,
			},
			profile,
		})

		// TODO: handle errors
		const response = await fetch('/api/profiles/create', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `bearer ${context.accessToken}`,
			  }),
			body,
		})

        const createdProfileData = await response.json();
        const createdProfile = createdProfileData.profile;

        set((state) => ({
            projectProfiles: [
                ...state.projectProfiles,
                createdProfile,
            ]
        }))
    },
    addToLocalRepos: async (owner: string, repo_id: string, name: string) => {
        const context = get().minderContext;
        const body = JSON.stringify({
			project_id: context.projectId,
			provider: context.provider,
			repository: {
					owner,
					repo_id,
					name,
			}
		})
		const response = await fetch('/api/repos/register', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `bearer ${context.accessToken}`,
			  }),
			body,
		})

        const repo = await response.json();
        const addedRepo = {...repo.result.repository, context: {provider: context.provider, project: context.projectId}};
        set((state) => ({
            localRepos: [
                ...state.localRepos,
                addedRepo
            ]
        }))


    },
    fetchData: async (projectID: string, access_token: string) => {
        const headers = new Headers();
		headers.append('authorization', `bearer ${access_token}`);
		const requestOptions = {
					method: 'GET',
					headers: headers,
				};

        // Fetch repos
        const remoteReposURL = '/api/repos/listremote?' + new URLSearchParams({project_id: projectID}).toString();
		const localReposURL = '/api/repos/listlocal?' + new URLSearchParams({project_id: projectID}).toString();
		const remoteReposResponse = await fetch(remoteReposURL, requestOptions);
		const localReposResponse = await fetch(localReposURL, requestOptions);
        const remoteReposData = await remoteReposResponse.json();
		const localReposData = await localReposResponse.json();
        set({remoteRepos: remoteReposData.results || []});
		set({localRepos: localReposData.results || []});

        // Fetch rules
        const rulesURL = '/api/rules/list?' + new URLSearchParams({project_id: projectID}).toString()
        const rulesResponse = await fetch(rulesURL, requestOptions);
        const rulesList = await rulesResponse.json();
        set({ projectRules: rulesList.ruleTypes || [] });

        // Fetch Profiles
        const profilesListURL = '/api/profiles/list?' + new URLSearchParams({project_id: projectID}).toString()
		const profilesResponse = await fetch(profilesListURL, requestOptions);
		const profilesList = await profilesResponse.json();
		set({projectProfiles: profilesList.profiles || []});
      },
}))