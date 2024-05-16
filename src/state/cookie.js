import Cookies from 'js-cookie';

export const setSessionCookie = (token) => {
  // Set the token in a cookie with an expiration of 30 minutes
  Cookies.set('token', token, { expires: 1 / 48 });
};

export const removeSessionCookie = () => {
  // Remove the token cookie
  Cookies.remove('token');
};
