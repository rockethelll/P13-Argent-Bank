import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Account from '@/components/Account/Account';
import { fetchUser } from '@/state/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();

  // Get the token from the cookie
  const token = Cookies.get('token');

  // Check if token exists and fetch user data
  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <Account />
    </>
  );
};

export default ProfilePage;
