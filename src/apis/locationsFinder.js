const locationsFinder = {};
const URL = process.env.REACT_APP_URL_SERVER + 'locations/';

locationsFinder.allStates = async (country) => {
  const response = await fetch(`${URL}state/${country}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', token: localStorage.token },
  });
  return await response.json();
};

locationsFinder.allCities = async (country, state) => {
  const response = await fetch(`${URL}city/${country}/${state}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', token: localStorage.token },
  });
  return await response.json();
};

locationsFinder.allMunicipalities = async (country, state, city) => {
  const response = await fetch(`${URL}city/${country}/${state}/${city}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', token: localStorage.token },
  });
  return await response.json();
};

export default locationsFinder;
