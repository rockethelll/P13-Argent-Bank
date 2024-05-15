import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Input from '@/components/Input/Input';

const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Pasword must be at least 8 characters' }),
});

const SignInForm = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('data', data);
    } catch (e) {
      console.error('erreur form');
      setError('root', {
        message: e.data.message,
      });
    }
  };

  return (
    <form>
      <Input {...register('email')} label='Email' />
      {errors['email'] && (
        <div className='input-error'>{errors['email'].message}</div>
      )}
      <Input {...register('password')} type='password' label='Password' />
      {errors['password'] && (
        <div className='input-error'>{errors['password'].message}</div>
      )}
      <div className='input-remember'>
        <input type='checkbox' id='remember-me' />
        <label htmlFor='remember-me'>Remember me</label>
      </div>
      <button
        className='sign-in-button'
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? 'Loading...' : 'Sign In'}
      </button>
      {errors.root && <div className='submit-error'>{errors.root.message}</div>}
    </form>
  );
};

export default SignInForm;
