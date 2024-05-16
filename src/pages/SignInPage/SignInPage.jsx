import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import SignInForm from '@/components/SignInForm/SignInForm';
import { setSessionCookie } from '@/state/cookie';

const SignInPage = () => {
  const token = useSelector((state) => state.authentication.token);
  const navigate = useNavigate();

  // Redirect to home page if user is already authenticated, cannot access the sign-in page anymore and set the session cookie
  useEffect(() => {
    if (token) {
      setSessionCookie(token);
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

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
