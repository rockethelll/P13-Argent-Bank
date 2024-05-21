import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom/dist';

import { logout } from '@/state/authenticationSlice';
import { fetchUser } from '@/state/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  const cookie = Cookies.get('token');
  const userFirstName = useSelector((state) => state.user?.firstName);

  // Fetch user data if the user is authenticated
  useEffect(() => {
    if (cookie && !userFirstName) {
      dispatch(fetchUser(token));
    }
  }, [cookie, dispatch, userFirstName, token]);

  const handleLogOut = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <nav className='main-nav'>
      <NavLink className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src='/images/argentBankLogo.png'
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </NavLink>
      <div>
        {cookie ? (
          <>
            <NavLink className='main-nav-item' to='/user/profile'>
              <i className='fa fa-user-circle'></i>
              {userFirstName}
            </NavLink>
            <NavLink
              className='main-nav-item'
              to='/'
              onClick={handleLogOut}
              data-testid='logout-btn'
            >
              <i className='fas fa-sign-out-alt'></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <NavLink
            className='main-nav-item'
            to='/user/login'
            data-testid='signin-btn'
          >
            <i className='fa fa-user-circle'></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
