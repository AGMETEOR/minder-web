import Header from '@/components/header';
import Provider from '@/components/provider';
import Sidebar from '@/components/sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project_id: string };
}) {
  return (
	<Provider>
	  <div>
		  <Header/>
		  <div className="flex">
			  <Sidebar project_id={params.project_id} />
			  <div className="p-7 flex-1 h-screen">{children}</div>
		  </div>
    </div>
	</Provider>
  )
}
