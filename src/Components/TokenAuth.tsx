import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Connect from "./Connect";

interface TokenAuthProps {
  children: React.ReactNode;
}

const TokenAuthPages: React.FC<TokenAuthProps> = ({ children }) => {
  const { token } = useContext(AppContext) as AppContextProps;

  if (!token) {
    return <Connect/>;
  }

  return <>{children}</>;
};

export default TokenAuthPages;
