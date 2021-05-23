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
  { content: 'By Position', value: 'position' },
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

const calculateElo = (times) => {
  const sum = times.reduce((a, b) => a + b, 0);
  return 100 / sum;
};

const getElo = (stats, users) => {
  const period = 7; // Use last n games to calculate
  const elo = {};
  const userTimeCache = users.reduce((cache, user) => ({ ...cache, [user.name]: [] }), {});

  console.log('time cahce', userTimeCache);

  Object.entries(stats).forEach(([date, dayStats]) => {
    Object.entries(dayStats).forEach(([username, seconds]) => {
      if (userTimeCache[username]?.length >= period) {
        userTimeCache[username]?.shift();
      }

      userTimeCache[username]?.push(seconds);
    });

    const dayElo = {};
    users.forEach((user) => {
      if (userTimeCache[user.name]?.length >= period) {
        dayElo[user.name] = calculateElo(userTimeCache[user.name]);
      }
    });

    if (Object.keys(dayElo).length > 0) {
      elo[date] = dayElo;
    }
  });

  return elo;
};

const LeaderboardStatsGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const [dateRange, setDateRange] = useState('week');
  const [graphContent, setGraphContent] = useState('elo');

  const statsToDisplay = getStatsInDateRange(stats, dateRange);

  const elo = getElo(stats, users);
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
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default LeaderboardStatsGraph;
