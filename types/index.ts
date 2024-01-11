export interface User {
	id: number;
	organizationId: string;
	identitySubject: string;
	createdAt: string;
	updatedAt: string;
}

export type CurrentUser = Pick<User, 'id'> & {
	name: string;
	email: string;
}

export type Project = {
	projectId: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export type RegisteredUser = {
	user: User;
	projects: Project[];
}

export type CreatedUser = {
	id: number;
	organizationId: string;
	organizatioName: string;
	projectId: string;
	projectName: string;
	identitySubject: string;
	createdAt: string;
	context?: any;
}

export type Info = {
	id: string;
	email: string;
	name: string;
	access_token?: string;
	refresh_token?: string;
	expires_at?: number;
	registeredUser?: RegisteredUser;
}

export enum StacklokProviders {
    GH =  "github",
    GL = "gitlab"
}

export type MinderContext = {
    provider: StacklokProviders;
    projectId: string;
	accessToken: string;
}

export type LocalRepo = {
	cloneUrl: string;
	createdAt?: string;
	defaultBranch: string;
	deployUrl: string;
	hookId: string;
	hookName: string;
	hookType: string;
	hookUrl: string;
	hookUuid: string;
	id: string;
	isFork: boolean;
	isPrivate: boolean;
	name: string;
	owner: string;
	registered: boolean;
	repoId: number;
	updatedAt?: string;
	context: {
		provider: string;
		projectId: string;
	};
}

export interface Rule {
	ruleType: {
	  id: string;
	  name: string;
	  context: {
		provider: string;
		project: string;
	  };
	  def: {
		inEntity: string;
		ruleSchema: {
		  properties: {
			enabled: {
			  default: boolean;
			  type: string;
			};
		  };
		};
		ingest: {
		  type: string;
		  rest: {
			endpoint: string;
			method: string;
			headers: any[];
			parse: string;
			fallback: any[];
		  };
		};
		eval: {
		  type: string;
		  jq: Array<{
			ingested: {
			  def: string;
			};
			profile: {
			  def: string;
			};
		  }>;
		};
		remediate: {
		  type: string;
		  rest: {
			endpoint: string;
			method: string;
			headers: any[];
			body: string;
			parse: string;
			fallback: any[];
		  };
		};
		alert: {
		  type: string;
		  securityAdvisory: {
			severity: string;
		  };
		};
	  };
	  description: string;
	  guidance: string;
	};
  }