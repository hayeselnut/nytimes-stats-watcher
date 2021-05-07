import React from 'react';
import PropTypes from 'prop-types';

import NYTCard from '../imitations/nyt-card';

const DaysPlayedCard = (props) => {
  const { stats, username } = props;

  const daysPlayed = Object.values(stats)
    .filter((day) => username in day)
    .length;

  return (
    <>
      <NYTCard icon='calendar alternate outline' header={`${daysPlayed} days`} subheader='Days played' />
    </>
  );
};

DaysPlayedCard.propTypes = {
  stats: PropTypes.object,
  username: PropTypes.string,
};

export default DaysPlayedCard;
