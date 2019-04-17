// import jwtDecode from 'jwt-decode';
// import localStorage from 'localstorage';

// export const getToken = () => {
//   const token = localStorage.getItem('ep-token');
//   return token;
// };

// export const isTokenExpired = token => {
//   try {
//     const decoded = jwtDecode(token);
//     if (decoded.exp < Date.now() / 1000) {
//       return true;
//     } else return false;
//   } catch (err) {
//     return false;
//   }
// };

// export const isLoggedIn = () => {
//   const token = getToken();
//   return !!token && isTokenExpired(token);
// };

// export const removeToken = () => {
//   return localStorage.removeItem('ep-token');
// };

// export const decodeToken = () => {
//   return jwtDecode(getToken());
// };

import jwtDecode from 'jwt-decode';
import localStorage from 'localStorage';

export function isLoggedIn() {
  const token = getToken();
  return !!token && !isTokenExpired(token); // handwaving here
}

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

export function getToken() {
  return localStorage.getItem('ep-token');
}

export function removeToken() {
  localStorage.removeItem('ep-token');
}

const decodeToken = () => {
  return jwtDecode(localStorage.getItem('ep-token'));
};

// export function setToken(token) {
//   localStorage.setItem('ep-token', token);
// }

const setToken = token => {
  localStorage.setItem('ep-token', token);
};

export { setToken, decodeToken };
