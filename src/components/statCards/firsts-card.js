import React from 'react';
import PropTypes from 'prop-types';

import NYTCard from '../imitations/nyt-card';

const FirstsCard = (props) => {
  const { stats, username } = props;

  const firsts = Object.values(stats)
    .filter((day) => username in day)
    .filter((day) => day[username] === Math.min(...Object.values(day)))
    .length;

  return <NYTCard emoji='🥇' header={`${firsts}`} subheader='Firsts' />;
};

FirstsCard.propTypes = {
  stats: PropTypes.object,
  username: PropTypes.string,
};

export default FirstsCard;
