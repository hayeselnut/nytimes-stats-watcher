import React from 'react';
import { Checkbox } from 'semantic-ui-react';

const UserCheckbox = (props) => {
  const { username } = props;

  return (
    <Checkbox label={username} />
  );
};

UserCheckbox.propTypes = {
  username: String,
};

export default UserCheckbox;
