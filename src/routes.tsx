import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Connect from "./Components/Connect";
import Mail from "./Components/Mail";
import Auth from "./utils/auth/page";
import TokenAuth from "./Components/TokenAuth"; // Import Pages component

const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Connect />,
  },
  {
    path: "/mail",
    element: (
      <TokenAuth>
        <Mail />
      </TokenAuth>
    ),
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default routes;