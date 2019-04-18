import jwtDecode from 'jwt-decode';
import localStorage from 'localStorage';

const isLoggedIn = () => !!getToken() && !isTokenExpired(getToken());


const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

const getToken = () => localStorage.getItem('ep-token');

const removeToken = () => localStorage.removeItem('ep-token');

const decodeToken = () => jwtDecode(localStorage.getItem('ep-token'));

const setToken = token => localStorage.setItem('ep-token', token);

export { isLoggedIn, setToken, decodeToken, removeToken, getToken, isTokenExpired };
