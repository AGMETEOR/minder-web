import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import StacklokProvider, { clientId, tokenURL } from '@/oauthprovider';
import { CreatedUser, Info, RegisteredUser } from '@/types';
import { baseUrl } from '@/constants/urls';

async function refreshAccessToken(token: any) {
	try {
		const url = tokenURL + '?';
		const formData = new URLSearchParams();
		formData.append('client_id', clientId);
		formData.append('grant_type', 'refresh_token');
		formData.append('refresh_token', token.refresh_token);

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
			body: formData
		})

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens
		}

		return {
			...token,
			access_token: refreshedTokens.access_token,
			expires_at: Date.now() + refreshedTokens.expires_in,
			refresh_token: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
		}
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: 'RefreshAccessTokenError',
		}
	}
}

export const authConfig: NextAuthOptions = {
	providers: [StacklokProvider],
	callbacks: {
		async jwt({ token: tokenInfo, user, account }) {
			try {
				if (user && account) {
					let info: Info = {
						id: user.id, // NOTE: this is not local stacklok control plane user id
						email: user.email || '',
						name: user.name || '',
						access_token: account.access_token,
						refresh_token: account.refresh_token,
						expires_at: account.expires_at,
					};
	
					// check for user
					const headers = new Headers();
					headers.append('authorization', `bearer ${account.access_token}`);
					const requestOptions = {
						method: 'GET',
						headers: headers,
					};
	
					const userResponse = await fetch(`${baseUrl}/api/users/get`, requestOptions);
					const userData = await userResponse.json();
					const userNotRegistered = (userData.code === 5) && (userData.details.length === 0);
					let registeredUser = <RegisteredUser>userData;
					if (userNotRegistered) {
						console.info('Creating new user...');
						const createOptions = {
							method: 'POST',
							headers: headers,
						};
						const createdUserResponse = await fetch(`${baseUrl}/api/users/create`, createOptions);
						const createdUserData = <CreatedUser>await createdUserResponse.json();
						registeredUser = {
							user: {
								id: createdUserData.id,
								organizationId: createdUserData.organizationId,
								identitySubject: createdUserData.identitySubject,
								createdAt: createdUserData.createdAt,
								updatedAt: '',
							},
							projects: [
								{
									projectId: createdUserData.projectId,
									name: createdUserData.projectName,
									description: '',
									createdAt: '',
									updatedAt: '',
								}
							],
						}
					}
	
					info.registeredUser = registeredUser;
					return info;
				}
	
				const nowSeconds = Math.floor(new Date().getTime());
	
				if (nowSeconds < tokenInfo.expires_at) {
					return tokenInfo;
				}
	
				return refreshAccessToken(tokenInfo);

				
			} catch (error) {
				console.error('Error in jwt callback:', error);
				throw error;	
			}
		},
		async session({ session, token: jwtCallbackInfo }) {
			return { ...session, ...jwtCallbackInfo };
		},
	},
}

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };

