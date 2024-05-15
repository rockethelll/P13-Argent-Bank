import { Route, Routes } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import HomePage from '@/pages/HomePage/HomePage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import SignInPage from '@/pages/SignInPage/SignInPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user/login' element={<SignInPage />} />
      <Route path='/user/profile' element={<ProfilePage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
