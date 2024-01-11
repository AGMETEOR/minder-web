import { useTranslations } from 'next-intl';
import React from 'react';
import ExternalLink from './external-link';

const Footer = () => {
    const t = useTranslations('Footer')
    return (
        <footer className="font-semibold font-fig">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between font-fig">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400"> 
                &copy; 2023 Minder-web {t('rights')}
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <ExternalLink href='https://status.stacklok.com/' text={t('status')} />
                    </li>
                    <li>
                        <ExternalLink href='https://www.trustypkg.dev/terms-and-conditions' text={t('terms')} />
                    </li>
                    <li>
                        <ExternalLink href='https://docs.stacklok.com/minder/' text={t('docs')} />
                    </li>
                </ul>
            </div>
    </footer>
    )
}

export default Footer;