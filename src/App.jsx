import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomRouter from './routes/Router';

export default function App() {
  return (
    <CustomRouter />
  );
}
