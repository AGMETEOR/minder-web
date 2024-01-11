import { useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


// TODO(allan): Replace this hacky and non scalable way for setting the locale
function replaceLanguageCode(url: string, newLanguageCode: string) {
    const match = url.match(/^\/([a-zA-Z]{2})\/(.*)/);
  
    if (match) {
      const [, currentLanguageCode, restOfPath] = match;
      const updatedUrl = `/${newLanguageCode}/${restOfPath}`;
      return updatedUrl;
    }
  
    return `/${newLanguageCode}${url}`;
  }

export default function LangSwitcher(){
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('LangSwitcher');
    return (
        <div className="absolute right-3 top-3 min-w-[176px] w-auto">
            <button onClick={() => setOpen(!open)} data-dropdown-toggle="dropdown" className="my-btn-no-background text-gray-900" type="button">
                {t('btn')} 
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div id="dropdown" className={`mt-2 z-10 ${open ? 'visible' : 'hidden'} divide-y divide-gray-100 rounded-lg shadow bg-gray-700 w-[inherit]`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                    <Link href={replaceLanguageCode(pathname, 'en')} locale='en' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><span className="fi fi-gb"></span> {t('english')}</Link>
                </li>
                <li>
                    <Link href={replaceLanguageCode(pathname, 'fr')} locale='fr' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><span className="fi fi-fr"></span> {t('french')}</Link>
                </li>
                <li>
                    <Link href={replaceLanguageCode(pathname, 'fi')} locale='fi' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><span className="fi fi-fi"></span> {t('finnish')}</Link>
                </li>
                </ul>
            </div>
        </div>
    )
}