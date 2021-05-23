import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

import TimeGraph from './graphs/time-graph';
import PositionGraph from './graphs/position-graph';
import { NYTColours } from './imitations/nyt-colours';
import NYTButtonGroup from './imitations/nyt-button-group';


const LeaderboardStatsGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const [subMinute, setSubMinute] = useState(false);
  const [dateRange, setDateRange] = useState('week');

  const [graphContent, setGraphContent] = useState('time');

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <NYTButtonGroup state={graphContent} setState={setGraphContent} >
          <Button content='By Time' value={'time'} />
          <Button content='By Position' value={'position'} />
        </NYTButtonGroup>
      </div>

      {graphContent === 'time' && <TimeGraph stats={stats} users={users} selectedUsers={selectedUsers}/>}
      {graphContent === 'position' && <PositionGraph stats={stats} users={users} selectedUsers={selectedUsers}/>}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <NYTButtonGroup state={dateRange} setState={setDateRange} >
          <Button content='Past 7 days' value={'week'} />
          <Button content='Past month' value={'month'} />
          <Button content='All time' value={'all time'} />
        </NYTButtonGroup>
      </div>

      <Button.Group>
      </Button.Group>
    </>
  );
};

LeaderboardStatsGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default LeaderboardStatsGraph;
