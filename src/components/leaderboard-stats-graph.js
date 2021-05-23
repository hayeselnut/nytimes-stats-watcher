import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TimeGraph from './graphs/time-graph';
import EloGraph from './graphs/elo-graph';

import NYTButtonGroup from './imitations/nyt-button-group';
import NYTSegment from './imitations/nyt-segment';

const timeButtons = [
  { content: 'Past 7 days', value: 'week' },
  { content: 'Past month', value: 'month' },
  { content: 'All time', value: 'all time' },
];

const graphTypeButtons = [
  { content: 'By Elo', value: 'elo' },
  { content: 'By Time', value: 'time' },
];

const getStatsInDateRange = (stats, dateRange) => {
  if (dateRange === 'week') {
    return Object.entries(stats)
      .slice(-7)
      .reduce((output, [key, data]) => ({
        ...output,
        [key]: data,
      }), {});
  }

  if (dateRange === 'month') {
    return Object.entries(stats)
      .slice(-30)
      .reduce((output, [key, data]) => ({
        ...output,
        [key]: data,
      }), {});
  }

  return stats;
};

const LeaderboardStatsGraph = (props) => {
  const { stats, elo, users, selectedUsers } = props;

  const [dateRange, setDateRange] = useState('week');
  const [graphContent, setGraphContent] = useState('elo');

  const statsToDisplay = getStatsInDateRange(stats, dateRange);

  const eloToDisplay = getStatsInDateRange(elo, dateRange);

  return (
    <NYTSegment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <NYTButtonGroup state={graphContent} setState={setGraphContent} buttons={graphTypeButtons} />
      </div>

      {graphContent === 'elo' && <EloGraph eloToDisplay={eloToDisplay} users={users} selectedUsers={selectedUsers}/>}
      {graphContent === 'time' && <TimeGraph stats={statsToDisplay} users={users} selectedUsers={selectedUsers}/>}
      {/* {graphContent === 'position' && <PositionGraph stats={statsToDisplay} users={users} selectedUsers={selectedUsers}/>} */}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <NYTButtonGroup state={dateRange} setState={setDateRange} buttons={timeButtons} />
      </div>
    </NYTSegment>
  );
};

LeaderboardStatsGraph.propTypes = {
  stats: PropTypes.object,
  elo: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default LeaderboardStatsGraph;
