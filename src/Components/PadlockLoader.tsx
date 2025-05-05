import React, { useContext, useEffect } from 'react';
import "../App.css";
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';


const PadlockLoader = () => {

    const currentAccount = useCurrentAccount();
    console.log('currentAccount:', currentAccount);
    
    return (
        <>
            <div className="padlock-loader-container">
                <div className="padlock-loader">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="50"
                        height="50"
                        className="padlock-icon"
                    >
                        <path
                            className="padlock-icon-path"
                            d="M18 8V5a5 5 0 0 0-10 0v3H7v12h10V8h-2zM9 5a3 3 0 0 1 6 0v3H9V5zm10 14H5V8h14v11z"
                        />
                        <path
                            className="padlock-icon-path-lock"
                            d="M12 15a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1-1z"
                        />
                    </svg>
                </div>
            </div>
        </>
    );
};

export default PadlockLoader;
