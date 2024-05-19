import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import SignInForm from '@/components/SignInForm/SignInForm';
import { fetchUser } from '@/state/userSlice';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );

  // Redirect to the profile page if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const token = Cookies.get('token');
      dispatch(fetchUser(token));
      navigate('/user/profile', { replace: true });
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <div className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <SignInForm />
      </section>
    </div>
  );
};

export default SignInPage;
