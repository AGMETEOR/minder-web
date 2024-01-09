'use client'
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHandHoldingHand, faArrowLeft, faBucket, faIdCard, faRuler} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	project_id: string;
}

const Sidebar = (props: Props) => {
	const [sidebarExpanded, setSideBarExpanded] = useState(true);
	const pathname = usePathname();
	const providersHref = `/dashboard/${props.project_id}/providers`;
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

					<li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === providersHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faHandHoldingHand}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}><Link href={providersHref}>Providers</Link></span></li>
					<li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === reposHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faBucket}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}><Link href={reposHref}>Repos</Link></span></li>
					<li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === rulesHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faRuler}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}><Link href={rulesHref}>Rules</Link></span></li>
					<li className={`flex items-center gap-x-4 cursor-pointer my-2 p-2 text-gray-300 text-sm hover:bg-light-white rounded-md ${pathname === profilesHref && 'bg-light-white'}`}><FontAwesomeIcon icon={faIdCard}/><span className={`origin-left duration-200 ${!sidebarExpanded && 'hidden'}`}><Link href={profilesHref}>Profiles</Link></span></li>
				</ul>
			</div>
	)
}
export default Sidebar;
