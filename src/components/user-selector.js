import React, { useState } from 'react';
import UserCheckbox from './user-checkbox';

const UserSelector = (props) => {
  const { users, selectedUsers, setSelectedUsers } = props;

  return (
    <>
      {users.map((username, i) => <UserCheckbox key={i} username={username} />)}
    </>
  );
};

UserSelector.propTypes = {
  users: Array,
  selectedUsers: Array,
  setSelectedUsers: Function,
};

export default UserSelector;
