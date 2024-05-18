import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import SignInForm from '@/components/SignInForm/SignInForm';

const SignInPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );

  // Redirect to the profile page if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
