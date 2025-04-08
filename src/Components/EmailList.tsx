import React, { useContext, useEffect, useState } from 'react';
// import { AppContext, AppContextProps } from '../utils/contexts/AppContext';

interface EmailListProps {
    // key: number;
    email: {
        date: string;
        subject: string;
        from: string;
        to: string;
    };
}

const EmailList: React.FC<EmailListProps> = ({ email }) => {
    return (
        <div className="bg-gray-100 pt-4 pl-2">
            <div className="w-full bg-white rounded-lg shadow p-2">
                <div className="w-fullflex flex-col bg-gray-50 200">
                    <div className="flex-1 overflow-y-auto">
                        <div className={`border-b border-gray-200 px-4 py-4 cursor-pointer 'hover:bg-gray-100'`}>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mr-3">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="/png/profile.png"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-medium ${true ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {email.from}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(email.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className={`text-sm mt-1 truncate ${false ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {email.subject}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default EmailList;