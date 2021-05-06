import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'semantic-ui-react';

const style = {
  marginBottom: '1rem',
  display: 'block',
};

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
          style={{ ...style, backgroundColor: user.colour }}
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
