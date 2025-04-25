import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SuinsContextType {
  suinsName: string | null;
  setSuinsName: (name: string | null) => void;
}

const SuinsContext = createContext<SuinsContextType | undefined>(undefined);


export const useSuins = (): SuinsContextType => {
  const context = useContext(SuinsContext);
  if (!context) {
    throw new Error('useSuins must be usd within a SuinsProvider');
  }
  return context;
};


interface SuinsProviderProps {
  children: ReactNode;
}

export  const  SuinsProvider: React.FC<SuinsProviderProps> = ({ children }) => {
  const [suinsName, setSuinsName] = useState<string | null>(null);

  return (
    <SuinsContext.Provider value={{ suinsName, setSuinsName }}>
      {children}
    </SuinsContext.Provider>
  );
};
