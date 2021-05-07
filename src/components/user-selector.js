import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'semantic-ui-react';
import { NYTColours } from './imitations/nyt-colours';

const style = (selectedUsernames, user) => ({
  marginBottom: '1rem',
  display: 'block',
  height: '2rem',
  borderRadius: '7px',
  fontWeight: 'bold',
  backgroundColor: selectedUsernames.includes(user.name) ? user.colour : NYTColours.lightGrey,
});

const UserSelector = (props) => {
  const { users, selectedUsernames, setSelectedUsernames } = props;

  const handleClick = (e, { value }) => {
    const newSelectedUsernames = selectedUsernames.includes(value)
      ? selectedUsernames.filter((username) => username !== value)
      : [...selectedUsernames, value];

    setSelectedUsernames(newSelectedUsernames);
  };

  return (
    <>
      {users.map((user, i) => (
        <Checkbox
          key={i}
          label={user.name}
          value={user.name}
          checked={selectedUsernames.includes(user.name)}
          onClick={handleClick}
          style={style(selectedUsernames, user)}
        />
      ))}
    </>
  );
};

UserSelector.propTypes = {
  users: PropTypes.array,
  selectedUsernames: PropTypes.array,
  setSelectedUsernames: PropTypes.func,
};

export default UserSelector;
