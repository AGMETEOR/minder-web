'use client'
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandHoldingHand, faArrowLeft, faBucket, faIdCard, faRuler} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Modal from './modal';
import ControlPlaneProviders from './control-plane-providers';
import { StacklokProviders } from '@/types';
import { useStore } from '@/store';
import { capitalizeFirstLetter } from '@/utils/general';

type Props = {
	project_id: string;
}

type SwitcherProps = {
	sidebarExpanded: boolean;
}

const SidebarProviderSwitcher = (props: SwitcherProps) => {
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const minderContext = useStore((state) => state.minderContext);
	const setMinderContext = useStore((state) => state.setMinderContext);
	const [currentProvider, setCurrentProvider] = useState(minderContext.provider);

	const handleProviderClick = (provider: StacklokProviders) => {
		setMinderContext(minderContext.projectId, minderContext.accessToken, provider);
		setCurrentProvider(provider);
		setOpen(false);
		setOpenModal(true);
	}
	return (
		<>
			<Modal
			title=""
			open={openModal} 
			onClose={() => setOpenModal(!openModal)}
			>
        	<ControlPlaneProviders provider={StacklokProviders.GH}/>
      	</Modal>
		<li className={`relative flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md 'bg-light-white`}>
			<button onClick={() => setOpen(!open)} className='flex items-center gap-x-4 cursor-pointer text-gray-300 text-sm'>
				<FontAwesomeIcon icon={faHandHoldingHand}/>
				{props.sidebarExpanded && <span className='duration-300'>{capitalizeFirstLetter(currentProvider)}</span>}
				{props.sidebarExpanded && (
					<svg className="w-2.5 h-2.5 ms-3 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
				</svg>
				)}
			</button>
			<div className={`mt-2 z-10 ${open ? 'visible' : 'hidden'} divide-y divide-gray-500 rounded-lg shadow bg-white absolute left-0 right-0 top-8 w-[210px]`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                <li>
                    <Link href="#" onClick={() => handleProviderClick(StacklokProviders.GH)} className="block px-4 py-2 hover:bg-gray-100"><span className="fi fi-gb"></span> {capitalizeFirstLetter(StacklokProviders.GH)}</Link>
                </li>
				<li>
                    <Link href="#" onClick={() => handleProviderClick(StacklokProviders.GH)} className="block px-4 py-2 hover:bg-gray-100"><span className="fi fi-gb"></span> {capitalizeFirstLetter(StacklokProviders.GL)}</Link>
                </li>
                </ul>
            </div>
		</li>
		</>
	)
}

const Sidebar = (props: Props) => {
	const t = useTranslations('Sidebar');
	const [sidebarExpanded, setSideBarExpanded] = useState(true);
	const pathname = usePathname();
	const locale = useLocale();
	const reposHref = `/dashboard/${props.project_id}/repos`;
	const profilesHref = `/dashboard/${props.project_id}/profiles`;
	const rulesHref = `/dashboard/${props.project_id}/rules`;

	return(
			<div className={`${sidebarExpanded ? 'w-72' : 'w-20'} duration-300 h-screen bg-stacklok-minder-blue relative`}>
				<button 
					onClick={() => setSideBarExpanded(!sidebarExpanded)}
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 bg-white rounded ${!sidebarExpanded && 'rotate-180'}`}>
					<FontAwesomeIcon icon={faArrowLeft}/>
				</button>
				<ul className="p-6">
					<SidebarProviderSwitcher sidebarExpanded={sidebarExpanded}/>
					<Link href={reposHref}><li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === "/" + locale + reposHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faBucket}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}>{t('repos')}</span></li></Link>
					<Link href={rulesHref}><li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === "/" + locale + rulesHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faRuler}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}>{t('rules')}</span></li></Link>
					<Link href={profilesHref}><li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === "/" + locale + profilesHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faIdCard}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}>{t('profiles')}</span></li></Link>
				</ul>
			</div>
	)
}
export default Sidebar;
