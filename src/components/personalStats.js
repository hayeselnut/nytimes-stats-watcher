import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NYTColours } from './imitations/nyt-colours';
import NYTHeader from './imitations/nyt-header';
import FastestTimeCard from './statCards/fastestTimeCard';
import AverageTimeCard from './statCards/averageTimeCard';
import DaysPlayedCard from './statCards/daysPlayedCard';
import { Dropdown } from 'semantic-ui-react';

const PersonalStats = (props) => {
  const { users, stats } = props;
  const [selectedUsername, setSelectedUsername] = useState('Hayeselnut');

  const usernameOptions = users.map((user) => ({
    key: user.name,
    text: user.name,
    value: user.name,
  }));

  const handleChange = (e, { value }) => {
    setSelectedUsername(value);
  };

  return users && (
    <>
      <NYTHeader level='h3' textAlign='center'>
        <Dropdown
          inline
          options={usernameOptions}
          defaultValue={selectedUsername}
          onChange={handleChange}
          style={{
            color: NYTColours.white,
          }}
        />
      </NYTHeader>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <FastestTimeCard stats={stats} username={selectedUsername} />
        <AverageTimeCard stats={stats} username={selectedUsername} />
        <DaysPlayedCard stats={stats} username={selectedUsername} />
      </div>
    </>
  );
};

PersonalStats.propTypes = {
  users: PropTypes.array,
  stats: PropTypes.object,
};

export default PersonalStats;
