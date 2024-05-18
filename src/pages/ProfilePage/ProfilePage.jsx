import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Account from '@/components/Account/Account';
import { fetchUser } from '@/state/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(fetchUser(token));
  }, [isAuthenticated, dispatch]);

  return <Account />;
};

export default ProfilePage;
