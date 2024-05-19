import AccountCard from '@/components/AccountCard/AccountCard';
import userTransctions from '@/data/userTransactions.json';

const Account = ({ user }) => {
  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className='edit-button'>Edit Name</button>
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
