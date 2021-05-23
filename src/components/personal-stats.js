import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from 'semantic-ui-react';

import { NYTColours } from './imitations/nyt-colours';
import NYTHeader from './imitations/nyt-header';

import FastestTimeCard from './statCards/fastest-time-card';
import AverageTimeCard from './statCards/avg-time-card';
import FirstsCard from './statCards/firsts-card';
import OverallPositionCard from './statCards/overall-position-card';
import WeekStatsCard from './statCards/week-stats-card';


const PersonalStats = (props) => {
  const { users, stats, elo } = props;
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <AverageTimeCard stats={stats} username={selectedUsername} />
          <FastestTimeCard stats={stats} username={selectedUsername} />
          <OverallPositionCard elo={elo} username={selectedUsername} />
          <FirstsCard stats={stats} username={selectedUsername} />
        </div>
        <WeekStatsCard stats={stats} username={selectedUsername} />
      </div>
    </>
  );
};

PersonalStats.propTypes = {
  users: PropTypes.array,
  stats: PropTypes.object,
  elo: PropTypes.object,
};

export default PersonalStats;
