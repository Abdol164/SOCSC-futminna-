import React from "react";
import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";
import Loading from "../../pages/loading";

export default function Auth() {
  const { handled } = useAuthCallback();
  console.log(handled)

  useEffect(() => {}, [handled]);

  return <Loading />;
}