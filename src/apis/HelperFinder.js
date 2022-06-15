const HelpersFinder = {};
const URL = process.env.REACT_APP_URL_SERVER + 'helpers/';

// fetch all official exchange rate
HelpersFinder.exchangeRateAll = async () => {
  try {
    const response = await fetch(`${URL}allrate/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

// fetch last 10 official exchange rate
HelpersFinder.rate = async () => {
  try {
    const response = await fetch(`${URL}rate/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

// insert a new official exchange rate
HelpersFinder.create = async (exchangeRate) => {
  try {
    const response = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
      body: JSON.stringify({ ...exchangeRate }),
    });
    return await response.json();
  } catch (error) {}
};

// update a official exchange rate
HelpersFinder.update = async (exchangeRate) => {
  try {
    const response = await fetch(`${URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
      body: JSON.stringify({ ...exchangeRate }),
    });
    return await response.json();
  } catch (error) {}
};

// Delete exchange rate
HelpersFinder.delete = async (exchangeRateId) => {
  try {
    const response = await fetch(URL + exchangeRateId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
    });
    return await response.json();
  } catch (error) {}
};

export default HelpersFinder;
