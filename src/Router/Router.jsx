import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import HomePage from '@/pages/HomePage/HomePage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import SignInPage from '@/pages/SignInPage/SignInPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user/login' element={<SignInPage />} />
      <Route
        path='/user/profile'
        element={
          <ProtectedRoute isProtected>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
