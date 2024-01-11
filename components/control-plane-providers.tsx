'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCodeCompare} from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { Info, StacklokProviders } from '@/types';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';


const GitHubStacklokProvider = () => {
	const t = useTranslations('Providers')
	const [verificationComplete, setVerificationComplete] = useState(false);
	const [verified, setVerified] = useState(false);

	const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/login')
        }
      });
	const sessionData = session.data as (Session & Info);
	let projectID = '';
	if (sessionData) {
		projectID = sessionData.registeredUser?.projects[0].projectId || '';
	}
	

	const getAuthorizationURL = async (accessToken: string, pID: string) => {
		const headers = new Headers();
		headers.append('authorization', `bearer ${accessToken}`);
		const requestOptions = {
			method: 'GET',
			headers: headers,
		};

		const uRL = '/api/provider/auth?' + new URLSearchParams({project_id: pID}).toString();
		const authorizationUrlResponse = await fetch(uRL, requestOptions);
		const authorizationData = await authorizationUrlResponse.json();
		return authorizationData.url;
	}

	const getVerificationStatus = async (accessToken: string, pID: string) => {
		const headers = new Headers();
		headers.append('authorization', `bearer ${accessToken}`);
		const requestOptions = {
			method: 'GET',
			headers: headers,
		};
		const uRL = '/api/provider/verification?' + new URLSearchParams({project_id: pID}).toString()
		const verifiedResponse = await fetch(uRL, requestOptions);
		return verifiedResponse.status;
	}

	const confirmVerificationDone = async (accessToken: string, pID: string, authURL: string) => {
		const winAny = window.open(authURL) as any;
	
		const timer = setInterval(async () => {
			if (winAny.closed) {
			  clearInterval(timer);
			  const status = await getVerificationStatus(accessToken, pID)
			  if (status === 200){
				setVerificationComplete(true);
				setVerified(true);
				return;
			  } else {
				setVerificationComplete(true);
				setVerified(false);
				return;
			  }
			}
		  }, 500);
	
	}

	// TODO: Find a way to check if already enrolled
	const enrollFunc = async () => {
		setVerificationComplete(false);
		setVerified(false);
		const authorizationURL = await getAuthorizationURL(sessionData.access_token || '', projectID);
		if (authorizationURL) {
			confirmVerificationDone(sessionData.access_token || '', projectID, authorizationURL);
		}
		
	}
	return (
		<div className="rounded-xl border-2 border-gray-blue-100 overflow-hidden">
			<div className="flex justify-between bg-gray-50 border-b border-gray-blue-100 py-3.5 px-6">
				<div className="me-3 text-gray-900 font-medium">Github</div>
				<FontAwesomeIcon icon={faCodeCompare}/>
			</div>
			<div className="py-3.5 px-6">
				<div className="mb-3 text-gray-900 font-normal">{t('title')}</div>
				<button onClick={() => enrollFunc()} className="h-[44px] flex items-center text-sm font-medium text-gray-900 leading-5 rounded-lg border transition-all ease-in-out duration-300 px-2.5 py-1 bg-gray-50 border-gray-200 hover:bg-gray-200 link">
					{verified && verificationComplete ? t('enrolled') : t('enroll')}
					</button>
			</div>
		</div>)
}

type Props = {
    provider: StacklokProviders;
}
export default function ControlPlaneProviders(props: Props){
    switch (props.provider) {
        case StacklokProviders.GH:
            return <GitHubStacklokProvider/>
        default:
            return <GitHubStacklokProvider/>
    }
}
