const AccessFinder = {};
const URL = `${process.env.REACT_APP_URL_SERVER}auth/`;

AccessFinder.signup = async (user) => {
  const response = await fetch(URL + 'register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...user }),
  });
  return await response.json();
};

AccessFinder.login = async (user) => {
  const response = await fetch(URL + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...user }),
  });
  return await response.json();
};

AccessFinder.verify = async (user) => {
  const response = await fetch(URL + 'is-verify', {
    method: 'GET',
    headers: { token: localStorage.token },
  });
  return await response.json();
};

export default AccessFinder;
