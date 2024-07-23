import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Characters from './components/Characters/Characters';
import Locations from './components/Locations/Locations';
import Character from './components/Character/Character';

const routes = [
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: 'characters',
        element: <Characters />,
        children: [{ path: ':id', element: <Character /> }],
      },
      { path: '/locations', element: <Locations /> },
    ],
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
