import { createBrowserRouter } from 'react-router';
import Root from './app/Root';
import Home from './app/pages/Home';
import Schedule from './app/pages/Schedule';
import Rules from './app/pages/Rules';
import Content from './app/pages/Content';
import Venue from './app/pages/Venue';
import Prizes from './app/pages/Prizes';
import Submit from './app/pages/Submit';
import Admin from './app/pages/Admin';

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
      { path: 'giaithuong', Component: Prizes },
      { path: 'nop-san-pham', Component: Submit },
    ],
  },
  {
    path: '/admin',
    Component: Admin,
  },
]);
