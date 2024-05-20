import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';

import AccountCard from '@/components/AccountCard/AccountCard';
import Input from '@/components/Input/Input';
import userTransctions from '@/data/userTransactions.json';
import { editUser } from '@/state/userSlice';

const EditUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const Account = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
    },
  });

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    reset({
      firstName: firstName,
      lastName: lastName,
    });
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    const token = Cookies.get('token');
    try {
      dispatch(editUser({ token, ...data }));
      setIsEditing(false);
    } catch (error) {
      setError('root', {
        message: 'error',
      });
    }
  };

  return (
    <main className='main bg-dark'>
      <div className='header'>
        {isEditing ? (
          <>
            <h1>Welcome back</h1>
            <form className='edit-form' onSubmit={handleSubmit(onSubmit)}>
              <Input {...register('firstName')} defaultValue={firstName} />
              {errors.firstName && (
                <div className='input-error'>{errors.firstName.message}</div>
              )}
              <Input {...register('lastName')} defaultValue={lastName} />
              {errors.lastName && (
                <div className='input-error'>{errors.lastName.message}</div>
              )}
              <div className='buttons-edit'>
                <button
                  className='edit-button'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Save'}
                </button>
                <button className='cancel-button' onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
            {/* {errors.root && (
                <div className='submit-error'>{errors.root.message}</div>
              )} */}
          </>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {firstName} {lastName}!
            </h1>
            <button className='edit-button' onClick={handleToggleEdit}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className='sr-only'>Accounts</h2>
      {userTransctions.map((transaction, index) => (
        <AccountCard
          key={index}
          title={transaction.title}
          amount={transaction.amount}
          description={transaction.description}
        />
      ))}
    </main>
  );
};

export default Account;
