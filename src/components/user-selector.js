import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Grid } from 'semantic-ui-react';

const UserSelector = (props) => {
  const { users, selectedUsers, setSelectedUsers } = props;

  const handleClick = (e, { value }) => {
    const newSelectedUsers = selectedUsers.includes(value)
      ? selectedUsers.filter((username) => username !== value)
      : [...selectedUsers, value];

    setSelectedUsers(newSelectedUsers);
  };

  return (
    <>
      <Grid>
        {users.map((username, i) => (
          <Grid.Row key={i}>
            <Checkbox
              label={username}
              value={username}
              checked={selectedUsers.includes(username)}
              onClick={handleClick}
            />
          </Grid.Row>
        ))}
      </Grid>
    </>
  );
};

UserSelector.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  setSelectedUsers: PropTypes.func,
};

export default UserSelector;
