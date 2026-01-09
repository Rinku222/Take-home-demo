import { Routes, Route } from 'react-router-dom';

import AddUser from '../pages/AddEvent';
import Home from '../pages/Home';
import ProtectedLayout from './ProtectedLayout';

export default function ProtectedRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddUser />} />
      </Route>
    </Routes>
  );
}
