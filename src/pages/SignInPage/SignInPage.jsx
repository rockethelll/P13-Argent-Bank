import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import SignInForm from '@/components/SignInForm/SignInForm';
import { fetchUser } from '@/state/userSlice';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);

  // Redirect to home page if user is already authenticated, cannot access the sign-in page anymore and set the session cookie
  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
      navigate('/', { replace: true });
    }
  }, [token, navigate, dispatch]);

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
