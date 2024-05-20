import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Input from '@/components/Input/Input';

// Define a schema for the form
const EditUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const EditForm = ({ firstName, lastName, onSubmit, onCancel }) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
    },
  });
  return (
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
          <button className='edit-button' type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Save'}
          </button>
          <button className='cancel-button' onClick={() => onCancel(reset)}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
