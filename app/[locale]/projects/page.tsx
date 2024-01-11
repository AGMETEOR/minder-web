'use client'
import { useStore } from '@/store';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

type ProjectProps = {
    id: string;
    name: string;
}

const ProjectCard = (props: ProjectProps) => {
    const t = useTranslations('Projects');
    return (
        <div className="flex flex-col justify-between min-w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow h-52">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 font-fig">{props.name}</h5>
            <Link href={`/dashboard/${props.id}/providers`} className="my-btn bg-stacklok-minder-blue text-white">
                {t('goToDashboard')}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>

    )
}

const CreateProject = () => {
    const t = useTranslations('Projects');
    return (
        <div className="flex flex-col justify-center items-center min-w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow h-52 cursor-pointer duration-75 hover:scale-105">
            <FontAwesomeIcon className='font-fig font-bold text-stacklok-minder-blue' icon={faPlus}/>
            <p className='font-fig font-bold text-stacklok-minder-blue'>{t('create')}</p>
        </div>
    )
}

const Projects = () => {
    const t = useTranslations('Projects');
    const projects = useStore((state) => state.projects);

    return (
        <div className="h-screen w-full relative">
            <div className="w-full h-1/4 bg-[#EBE0FF] absolute right-0 left-0 top-0"></div>
            <div className="relative px-20 pt-20">
                <h5 className="font-bold text-[28px]">{t('title')}</h5>
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