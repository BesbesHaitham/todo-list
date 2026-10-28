import { Navigate, Route, Routes } from 'react-router-dom';
import TodoPage from '../pages/TodoPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
