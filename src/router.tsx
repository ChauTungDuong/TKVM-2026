import { createBrowserRouter } from 'react-router';
import Root from './app/Root';
import Home from './app/pages/Home';
import Schedule from './app/pages/Schedule';
import Rules from './app/pages/Rules';
import Content from './app/pages/Content';
import Venue from './app/pages/Venue';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'thoigian', Component: Schedule },
      { path: 'hinhthuc', Component: Rules },
      { path: 'noidung', Component: Content },
      { path: 'diadiem', Component: Venue },
    ],
  },
]);
