import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';
import { NYTColours, darken } from './imitations/nyt-colours';
import { deleteUsernamesInURL, setUsernamesInURL } from '../helpers/url-helpers';

const style = (selectedUsernames, user) => {
  return {
    display: 'block',
    marginBottom: '1rem',
    padding: '0 1rem',
    height: '2rem',
    textAlign: 'left',
    borderRadius: '7px',
    boxShadow: `0 3px 0 0 ${selectedUsernames.includes(user.name) ? darken(user.colour) : darken(NYTColours.lightGrey)}`,
    backgroundColor: selectedUsernames.includes(user.name) ? user.colour : NYTColours.lightGrey,
    fontWeight: 'bold',
    color: selectedUsernames.includes(user.name) ? NYTColours.white : NYTColours.black,
  };
};

const UserSelector = (props) => {
  const { users, selectedUsernames, setSelectedUsernames } = props;

  const handleClick = (e, { value }) => {
    const newSelectedUsernames = selectedUsernames.includes(value)
      ? selectedUsernames.filter((username) => username !== value)
      : [...selectedUsernames, value].sort((a, b) => a.localeCompare(b, 'en', { 'sensitivity': 'base' }));

    if (newSelectedUsernames.length > 0) {
      setUsernamesInURL(newSelectedUsernames);
    } else {
      deleteUsernamesInURL();
    }

    setSelectedUsernames(newSelectedUsernames);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      {users.map((user, i) => (
        <Button
          key={i}
          content={user.name}
          value={user.name}
          onClick={handleClick}
          style={style(selectedUsernames, user)}
        />
      ))}
    </div>
  );
};

UserSelector.propTypes = {
  users: PropTypes.array,
  selectedUsernames: PropTypes.array,
  setSelectedUsernames: PropTypes.func,
};

export default UserSelector;
