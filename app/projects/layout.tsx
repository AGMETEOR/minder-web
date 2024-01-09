import Footer from '@/components/footer';
import Header from '@/components/header';
import Provider from '@/components/provider';
import React from 'react';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
	<Provider>
        <div className="flex flex-col h-screen justify-between">
        <Header/>
        {children}
        <Footer/>
</div>
	</Provider>
  )
}