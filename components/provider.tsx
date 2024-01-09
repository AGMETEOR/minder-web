'use client'
import { useStore } from '@/store';
import { Info } from '@/types';
import { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

function InitState() {
    const fetchData = useStore(((state) => state.fetchData));
    const setMinderContext = useStore(((state) => state.setMinderContext));
    const setCurrentUser = useStore(((state) => state.setCurrentUser));
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/login')
        }
      });
	const sessionData = session.data as (Session & Info);
	let projectID = '';
    let accessToken = '';
    let userEmail = '';
    let userId = 0;
    let userName = '';
	if (sessionData) {
		projectID = sessionData.registeredUser?.projects[0].projectId || '';
        accessToken = sessionData.access_token || '';
        userEmail = sessionData.user?.email || '';
        userName = sessionData.user?.name || '';
        userId = sessionData.registeredUser?.user.id || 0;
	}

    useEffect(() => {
        if(projectID && accessToken) {
            const loadData = async () => {
                await fetchData(projectID, accessToken);
            }
            
            setMinderContext(projectID, accessToken, "github");
            setCurrentUser({
                id: userId,
                name: userName,
                email: userEmail,
            })
            loadData();
        }  
	}, [session, projectID, accessToken]);

    return null;
}
export default function Provider({children}: Props){
    return (
    <SessionProvider>
        <InitState/>
        {children}
    </SessionProvider>)
}

