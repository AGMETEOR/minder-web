import { useTranslations } from 'next-intl';
import React from 'react';

const Footer = () => {
    const t = useTranslations('Footer')
    return (
        <footer className="">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 
                    <a href="#" className="hover:underline"> Minder-web</a>. {t('rights')}
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">{t('status')}</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">{t('terms')}</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">{t('docs')}</a>
                    </li>
                </ul>
            </div>
    </footer>
    )
}

export default Footer;