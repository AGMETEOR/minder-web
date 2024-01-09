'use client'
import { Info, Project } from '@/types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type ProjectProps = {
    id: string;
    name: string;
}

const ProjectCard = (props: ProjectProps) => {
    return (
        <div className="flex flex-col justify-between min-w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow h-52">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{props.name}</h5>
            <Link href={`/dashboard/${props.id}/providers`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Go to project dashboard
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>

    )
}

const CreateProject = () => {
    return (
        <div className="flex flex-col justify-center items-center min-w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow h-52 cursor-pointer duration-75 hover:scale-105">
            <FontAwesomeIcon icon={faPlus}/>
            <p>Create project</p>
        </div>
    )
}

const Projects = () => {
    const session = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/login')
        }
      });
	const sessionData = session.data as (Session & Info);
    let projects: Project[] = [];
    if (sessionData) {
		projects = sessionData.registeredUser?.projects || [];
	}

    return (
        <div className="h-screen w-full relative">
            <div className="w-full h-1/4 bg-[#EBE0FF] absolute right-0 left-0 top-0"></div>
            <div className="relative px-20 pt-20">
                <h5 className="font-bold text-[28px]">Your minder projects</h5>
            </div>
            <div className="relative flex gap-5 flex-wrap p-20 justify-start">
                <CreateProject/>
                {projects.map(p => {
                    return (<ProjectCard id={p.projectId} name={p.name}/>)
                })}
            </div>
        </div>
    )
}

export default Projects;