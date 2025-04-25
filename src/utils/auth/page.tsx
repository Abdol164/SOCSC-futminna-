import React from "react";
import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";
import Loading from "../../Components/Loading";

export default function Auth() {
  const { handled } = useAuthCallback(); // This hook will handle the callback from the authentication provider\
  console.log(handled)

  useEffect(() => {}, [handled]);

  return <Loading />;
}