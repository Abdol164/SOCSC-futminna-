import React from 'react';
import EmailList from './Email-list' 
import EmailDetailPage from './Email-view' 
import Sidebar from './Sidebar'

export default function InboxPage(){
    return(
        <div className='flex h-screen'>
            {/* sidebar */}
            <div className="w-64 border-r border-gray-200 overflow-auto">
                <Sidebar/>
            </div>

            {/* EmailList */}
            <div className="w-80 border-r border-gray-200 overflow-auto">
            <EmailList/>
            </div>

            {/* EmailView */}
            <div className="flex-1 overflow-auto">
                <EmailDetailPage/>
            </div>
           
        </div>
    )
}
