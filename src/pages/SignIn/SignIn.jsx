import Input from '@/components/Input/Input';

const SignIn = () => {
  return (
    <div className='main bg-dark'>
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        <form>
          <Input label='Username' type='text' id='username' />
          <Input label='Password' type='password' id='password' />
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button className='sign-in-button'>Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
