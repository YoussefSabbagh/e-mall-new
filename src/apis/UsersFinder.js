const UsersFinder = {};
const URL = process.env.REACT_APP_URL_SERVER + "users/";

UsersFinder.byId = async (user_id) => {
  const response = await fetch(`${URL}${user_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });
  return await response.json();
};

UsersFinder.update = async (user_id, user) => {
  const response = await fetch(`${URL}${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", token: localStorage.token },
    body: JSON.stringify({ user }),
  });
  return await response.json();
};

UsersFinder.all = async (user) => {
  const response = await fetch(URL + "all", {
    method: "GET",
    headers: { "Content-Type": "application/json", token: localStorage.token },
  });

  return await response.json();
};

export default UsersFinder;
