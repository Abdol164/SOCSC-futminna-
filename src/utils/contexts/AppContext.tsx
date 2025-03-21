import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
  sharedState: object;
  setSharedState: React.Dispatch<React.SetStateAction<object>>;
  responseData: any;
  setResponseData: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sharedState, setSharedState] = useState({});
  const [responseData, setResponseData] = useState(null);

  return (
    <AppContext.Provider value={{ sharedState, setSharedState, responseData, setResponseData }}>
      {children}
    </AppContext.Provider>
  );
};