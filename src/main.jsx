import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Characters from './components/Characters/Characters';
import Locations from './components/Locations/Locations';
import Episodes from './components/Episodes/Episodes';
import Location from './components/Location/Location';
import Episode from './components/Episode/Episode';
import Character from './components/Character/Character';

//COMMENTSSSSSSSSSSSSSSSSSSS
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
      {
        path: '/locations',
        element: <Locations />,
        children: [{ path: ':id', element: <Location /> }],
      },
      {
        path: '/episodes',
        element: <Episodes />,
        children: [{ path: ':id', element: <Episode /> }],
      },
    ],
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
