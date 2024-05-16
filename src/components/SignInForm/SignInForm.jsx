import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as z from 'zod';

import Input from '@/components/Input/Input';
import { login } from '@/state/authenticationSlice';

// Create a validation schema for the sign-in form
const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

const SignInForm = () => {
  const dispatch = useDispatch();

  // Use the useForm hook to manage the form state
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(SignInFormSchema),
  });

  // Handle the form submission
  const onSubmit = (data) => {
    try {
      dispatch(login(data));
    } catch (error) {
      console.error('erreur form', error);
      setError('root', {
        message: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        label='Email'
        defaultValue='tony@stark.com'
      />
      {errors.email && (
        <div className='input-error'>{errors.email.message}</div>
      )}
      <Input
        {...register('password')}
        type='password'
        label='Password'
        defaultValue='password123'
      />
      {errors.password && (
        <div className='input-error'>{errors.password.message}</div>
      )}
      <div className='input-remember'>
        <input type='checkbox' id='remember-me' {...register('remember')} />
        <label htmlFor='remember-me'>Remember me</label>
      </div>
      <button className='sign-in-button' disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Sign In'}
      </button>
      {errors.api && <div className='submit-error'>{errors.api.message}</div>}
    </form>
  );
};

export default SignInForm;
