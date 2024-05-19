import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom/dist';

import { logout } from '@/state/authenticationSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );
  const userFirstName = useSelector((state) => state.user?.firstName);

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
        {isAuthenticated ? (
          <>
            <NavLink className='main-nav-item' to='/user/profile'>
              <i className='fa fa-user-circle'></i>
              {userFirstName}
            </NavLink>
            <NavLink className='main-nav-item' to='/' onClick={handleLogOut}>
              <i className='fas fa-sign-out-alt'></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <NavLink className='main-nav-item' to='/user/login'>
            <i className='fa fa-user-circle'></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
