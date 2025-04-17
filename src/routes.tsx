import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Connect from './Components/Connect';
import Mail from './Components/Mail';

const routes = createBrowserRouter([
    {
        index: true,
        path: '/',
        element: <Connect />
    },
     {
         path: '/mail',
        element: <Mail />
     }
]);

export default routes;