import { Route, Routes } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import Home from '@/pages/Home/Home';
import Profile from '@/pages/Profile/Profile';
import SignIn from '@/pages/SignIn/SignIn';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/login' element={<SignIn />} />
      <Route path='/user/profile' element={<Profile />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
