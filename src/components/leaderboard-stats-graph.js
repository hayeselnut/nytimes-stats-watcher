import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

import TimeGraph from './graphs/time-graph';
import PositionGraph from './graphs/position-graph';
import { NYTColours } from './imitations/nyt-colours';


const LeaderboardStatsGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const [subMinute, setSubMinute] = useState(false);
  const [dateRange, setDateRange] = useState(7);

  const [graphContent, setGraphContent] = useState('time');

  return (
    <>
      <Button.Group >
        <Button
          content='By Time'
          style={{ backgroundColor: graphContent === 'time' ? NYTColours.blue : NYTColours.lightGrey }}
          onClick={() => setGraphContent('time')}
        />
        <Button
          content='By Position'
          style={{ backgroundColor: graphContent === 'position' ? NYTColours.blue : NYTColours.lightGrey }}
          onClick={() => setGraphContent('position')}
        />
      </Button.Group>

      <br/>

      {graphContent === 'time' && <TimeGraph stats={stats} users={users} selectedUsers={selectedUsers}/>}
      {graphContent === 'position' && <PositionGraph stats={stats} users={users} selectedUsers={selectedUsers}/>}

      <Button.Group>
        <Button content='Past 7 days' />
        <Button content='Past month' />
        <Button content='All time' />
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
