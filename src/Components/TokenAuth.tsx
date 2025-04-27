import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
import PadlockLoader from "./PadlockLoader";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";

interface TokenAuthProps {
  children: React.ReactNode;
}

const TokenAuthPages: React.FC<TokenAuthProps> = ({ children }) => {
  const { token } = useContext(AppContext) as AppContextProps;

  if (!token) {
    return <PadlockLoader />;
  }

  return <>{children}</>;
};

export default TokenAuthPages;
