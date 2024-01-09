'use client'
import {useState} from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { getInitials } from '@/utils/general';
import { useStore } from '@/store';
import { useTranslations } from 'next-intl';

const Header = () => {
	const t = useTranslations("Header");
	const user = useStore((state) => state.currentUser);

	const userName = user.name;
	const initials = getInitials(userName);
	const userEmail = user.email;

	const imgStr = 'https://github.com/stacklok/minder/raw/main/docs/docs/images/Minder_darkMode.png';
	const [openMenu, setOpenMenu] = useState(false);
	return (
		<div className='flex sticky top-0 bg-white z-50
			justify-between 
			items-center 
			border-b 
			py-4 
			px-[20px] 
			xl:px-[112px]'>
			<div className='flex items-center'>
				<a className='me-3 min-w-[156px] min-h-[42px]'>
					<Image 
						alt="icon" 
						loading="lazy"
						width="156" 
						height="42" 
						decoding="async" 
						data-nimg="1" 
						style={{color: 'transparent'}} 
						src={imgStr}
						data-cmp-ab="2" 
						data-cmp-info="10" />
				</a>
			</div>
			<div className='relative'>
				<div className='inline-flex cursor-pointer'>
					<div onClick={() => setOpenMenu(!openMenu)}  className="w-[40px] 
						h-[40px] 
						flex 
						justify-center 
		 				items-center 
						bg-gray-100 
						rounded-full 
						border 
						border-blue-100 
						text-cyan-950 
						text-sm 
						font-medium">AG</div>
					<div className={`absolute
						right-0 
						top-[45px] 
						z-50 
						bg-white 
						rounded-lg 
						border 
						border-blue-100 
						${openMenu ? 'visible' : 'hidden'}`}>
						<div className="p-3 
							flex 
							items-center 
							border-b 
							border-blue-100">
							<div className="me-3">
								<div className="w-[40px] 
									h-[40px] 
									flex 
									justify-center 
									items-center 
									bg-gray-100 
									rounded-full 
									border 
									border-blue-100 
									text-cyan-950 
									text-sm 
									font-medium">{initials}</div>
						</div>
						<div className="text-base text-gray-900">
							<div className="font-semibold">{userName}</div>
							<div className="text-sm text-gray-600">{userEmail}</div>
					</div>
				</div>
				<div onClick={() => signOut()} className="p-1 text-gray-900 font-medium">
					<div className="flex items-center px-3 py-2  text-cyan-950 text-sm rounded-md hover:bg-gray-100 font-medium cursor-pointer transition-all ease-in-out duration-300">
						<svg width="16" height="16" viewBox="0 0 16 16" className="me-3" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.66667 10.3333L13 7M13 7L9.66667 3.66667M13 7H5M5 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.7157 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V9.8C1 10.9201 1 11.4802 1.21799 11.908C1.40973 12.2843 1.71569 12.5903 2.09202 12.782C2.51984 13 3.0799 13 4.2 13H5" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="stroke-cyan-950"></path>
						</svg>
						<span>{t('signout')}</span>
					</div>
				</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;
