import React, { createContext, useState, ReactNode } from 'react';
// import App from './../../App';

export interface AppContextProps {
  activeNavItem: string;
  setActiveNavItem: React.Dispatch<React.SetStateAction<string>>;
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  connectionState: string;
  setConnectionState: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  // from: string;
  // setFrom: React.Dispatch<React.SetStateAction<string>>;
  // to: string;
  // setTo: React.Dispatch<React.SetStateAction<string>>;
  // subject: string;
  // setSubject: React.Dispatch<React.SetStateAction<string>>;
  // date: string;
  // setDate: React.Dispatch<React.SetStateAction<string>>;
  // newbie: string;
  // setNewbie: React.Dispatch<React.SetStateAction<string>>;
  // decryptedMessage: string | undefined;
  // setDecryptedMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  // emailClick: boolean;
  // setEmailClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeNavItem, setActiveNavItem] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [connectionState, setConnectionState] = useState('');
  const [token, setToken] = useState('');
  // const [from, setFrom] = useState('');
  // const [to, setTo] = useState('');
  // const [subject, setSubject] = useState('');
  // const [date, setDate] = useState('');
  // const [newbie, setNewbie] = useState('');
  // const [decryptedMessage, setDecryptedMessage] = useState<string | undefined>(undefined);
  // const [emailClick, setEmailClick] = useState(false);

  return (
    <AppContext.Provider value={{
      activeNavItem,
      setActiveNavItem,
      walletAddress,
      setWalletAddress,
      connectionState,
      setConnectionState,
      token,
      setToken, 
      // from,
      // setFrom,
      // to,
      // setTo,
      // subject,
      // setSubject,
      // date,
      // setDate,
            // newbie, 
      // setNewbie,
      // decryptedMessage,
      // setDecryptedMessage,
      // emailClick,
      // setEmailClick
      
    }}>
      {children}
    </AppContext.Provider>
  );
};