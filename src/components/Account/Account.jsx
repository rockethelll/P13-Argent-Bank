import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountCard from '@/components/AccountCard/AccountCard';
import EditForm from '@/components/EditForm/EditForm';
import userTransctions from '@/data/userTransactions.json';
import { editUser } from '@/state/userSlice';

const Account = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);

  // Toggle the edit form
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Cancel the edit form
  const handleCancel = (reset) => {
    reset({
      firstName: firstName,
      lastName: lastName,
    });
    // Avoid a flash of the edit form before it's hidden
    setTimeout(() => setIsEditing(false), 0);
  };

  // Submit the form
  const onSubmit = (data) => {
    const token = Cookies.get('token');
    try {
      dispatch(editUser({ token, ...data }));
      setIsEditing(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <main className='main bg-dark'>
      <div className='header'>
        {isEditing ? (
          <EditForm
            firstName={firstName}
            lastName={lastName}
            onCancel={handleCancel}
            onSubmit={onSubmit}
          />
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
