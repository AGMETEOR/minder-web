'use client';
import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { providerID } from '@/oauthprovider';
import {useLocale, useTranslations} from 'next-intl';
import LangSwitcher from '@/components/locale-switcher';
import './login.css';
import { useStore } from '@/store';
import ErrorBanner from '@/components/error-banner';
import { redirect, usePathname } from 'next/navigation';

const Login = () => {
	const setErrorBannerMessage = useStore((state) => state.setErrorBannerMessage);
	const t = useTranslations('Login');
	const tError = useTranslations('Errors');
	const locale = useLocale();
	const pathname = usePathname();
	const imgStr = 'https://stacklok-statamic-1.nyc3.digitaloceanspaces.com/minder-logo-no-bg-1699288002.svg';
	const handleSignin = async () => {
		try {
			await signIn(providerID, { callbackUrl: `/${locale}/projects` });
		  } catch (error) {
			setErrorBannerMessage(tError('loginfailed'));
			redirect(pathname);
		  }
	}
	return (
		<div className='flex justify-center items-center h-screen relative'>
			<ErrorBanner />
			<LangSwitcher/>
			<div className='flex flex-col justify-center items-center w-1/3'>
				<Image 
					alt="minder logo" 
					loading="lazy"
					width="250" 
					height="48" 
					decoding="async"
					style={{color: 'transparent'}} 
					src={imgStr} />
				<div className='text-center normal-text pt-[15px] pb-[32px]'>
					<h5 className='text-[12px] font-bold uppercase'>{t('title')}</h5>
					<h3 className='text-[32px] font-bold mt-5'>{t('proposition')}</h3>
					<p className='text-gray-500'>
					{t('description')}
					</p>
				</div>
				<button
					onClick={handleSignin}
					type="button" 
					className='my-btn bg-gray-900 text-white'>
					<svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd"/>
					</svg>
					{t('signin')}
				</button>
		      </div>
	
		</div>
	)

}
export default Login;
