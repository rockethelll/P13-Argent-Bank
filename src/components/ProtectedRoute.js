import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isProtected }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated,
  );

  useEffect(() => {
    if (isProtected && !isAuthenticated) {
      navigate('/user/login', { replace: true });
    }
  }, [isProtected, navigate, isAuthenticated]);

  return isProtected && !isAuthenticated ? null : children;
};

export default ProtectedRoute;
