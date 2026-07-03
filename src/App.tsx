import { RouterProvider } from 'react-router';
import { router } from './router';
import './styles/global.css';

export default function App() {
  return <RouterProvider router={router} />;
}
