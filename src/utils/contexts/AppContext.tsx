import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AppContextProps {
  activeNavItem: string;
  setActiveNavItem: React.Dispatch<React.SetStateAction<string>>;
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
  connectionState: string;
  setConnectionState: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
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
  const navigate = useNavigate();

  const user = {
    subname: '' // Example user object, replace with actual user data
  };

  useEffect(() => {
    if (!user.subname) {
      // Redirect to subname creation page if subname is not set
      navigate("/create-subname");
    }
  }, [user]);

  return (
    <AppContext.Provider value={{
      activeNavItem,
      setActiveNavItem,
      walletAddress,
      setWalletAddress,
      connectionState,
      setConnectionState,
      token,
      setToken
    }}>
      {children}
    </AppContext.Provider>
  );
};