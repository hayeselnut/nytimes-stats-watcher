const usersParamKey = 'users';
const title = 'Stats Watcher';

export const setUsernamesInURL = (usernames) => {
  const url = new URL(window.location);
  url.searchParams.set(usersParamKey, usernames);
  window.history.replaceState(null, title, url);
};

export const deleteUsernamesInURL = () => {
  const url = new URL(window.location);
  url.searchParams.delete(usersParamKey);
  window.history.replaceState(null, title, url);
};

export const getUsernamesInURL = (users) => {
  const url = new URL(window.location);
  const usernamesFromUrl = url.searchParams.get(usersParamKey)?.split(',') || [];
  const allowedUsernames = users.map((user) => user.name);
  return usernamesFromUrl.filter((username) => allowedUsernames.includes(username));
};
