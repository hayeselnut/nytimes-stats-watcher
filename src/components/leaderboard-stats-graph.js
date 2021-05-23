import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TimeGraph from './graphs/time-graph';
import PositionGraph from './graphs/position-graph';
import NYTButtonGroup from './imitations/nyt-button-group';
import NYTSegment from './imitations/nyt-segment';

const timeButtons = [
  { content: 'Past 7 days', value: 'week' },
  { content: 'Past month', value: 'month' },
  { content: 'All time', value: 'all time' },
];

const graphTypeButtons = [
  { content: 'By Time', value: 'time' },
  { content: 'By Position', value: 'position' },
];

const getStatsInDateRange = (stats, dateRange) => {
  if (dateRange === 'week') {
    return Object.entries(stats)
      .slice(-7)
      .reduce((statsToDisplay, [date, dayStats]) => ({
        ...statsToDisplay,
        [date]: dayStats,
      }), {});
  }

  if (dateRange === 'month') {
    return Object.entries(stats)
      .slice(-30)
      .reduce((statsToDisplay, [date, dayStats]) => ({
        ...statsToDisplay,
        [date]: dayStats,
      }), {});
  }

  return stats;
};

const LeaderboardStatsGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const [dateRange, setDateRange] = useState('week');
  const [graphContent, setGraphContent] = useState('time');

  const statsToDisplay = getStatsInDateRange(stats, dateRange);

  return (
    <NYTSegment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <NYTButtonGroup state={graphContent} setState={setGraphContent} buttons={graphTypeButtons} />
      </div>

      {graphContent === 'time' && <TimeGraph stats={statsToDisplay} users={users} selectedUsers={selectedUsers}/>}
      {graphContent === 'position' && <PositionGraph stats={statsToDisplay} users={users} selectedUsers={selectedUsers}/>}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <NYTButtonGroup state={dateRange} setState={setDateRange} buttons={timeButtons} />
      </div>
    </NYTSegment>
  );
};

LeaderboardStatsGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default LeaderboardStatsGraph;
