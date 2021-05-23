import React from 'react';
import PropTypes from 'prop-types';

import NYTCard from '../imitations/nyt-card';

const WeekStatsCard = (props) => {
  const { stats, username } = props;

  const firsts = Object.values(stats)
    .filter((day) => username in day)
    .filter((day) => day[username] === Math.min(...Object.values(day)))
    .length;

  return <NYTCard emoji='🥇' header={`${firsts}`} subheader='Firsts' large />;
};

WeekStatsCard.propTypes = {
  stats: PropTypes.object,
  username: PropTypes.string,
};

export default WeekStatsCard;
