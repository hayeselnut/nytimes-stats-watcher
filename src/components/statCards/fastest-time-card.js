import React from 'react';
import PropTypes from 'prop-types';

import NYTCard from '../imitations/nyt-card';
import { toMinsSecs } from '../../helpers/date-helpers';

const FastestTimeCard = (props) => {
  const { stats, username } = props;

  const orderedByTime = Object.entries(stats)
    .filter(([day, times]) => username in times)
    .sort(([dayA, timesA], [dayB, timesB]) => timesA[username] - timesB[username]);

  const [, fastestTime] = orderedByTime.length > 0
    ? [orderedByTime[0][0], toMinsSecs(orderedByTime[0][1][username])]
    : ['N/A', undefined];

  return <NYTCard emoji='⏱' header={fastestTime} subheader='Fastest time' />;
};

FastestTimeCard.propTypes = {
  stats: PropTypes.object,
  username: PropTypes.string,
};

export default FastestTimeCard;
