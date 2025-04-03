import React, { useContext, useEffect, useState } from 'react';
import { RefreshCcw, MoreVertical } from 'lucide-react';
import { AppContext } from '../utils/contexts/AppContext';
import PropTypes from 'prop-types';
// import { set } from 'zod';


const EmailList = () => {


    return (
        <div className="bg-gray-100 min-h-screen pt-4 pl-2">
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
                                            from
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            date
                                        </p>
                                    </div>
                                    <p className={`text-sm mt-1 truncate ${false ? 'text-gray-900' : 'text-gray-500'}`}>
                                        subject
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Email */}
        </div>
    );
};


export default EmailList;