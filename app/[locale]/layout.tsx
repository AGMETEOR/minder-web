import type { Metadata } from 'next'
import {NextIntlClientProvider, useMessages} from 'next-intl';
import { Inter } from 'next/font/google'
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Minder-web',
  description: 'Minder web client',
}

export default function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = useMessages();
  return (
    <html lang={locale} className='scroll-smooth antialiased'>
      <body className={inter.className}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
      </body>
    </html>
  )
}
