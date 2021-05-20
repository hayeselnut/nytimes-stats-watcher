import React from 'react';
import PropTypes from 'prop-types';

import NYTCard from '../imitations/nyt-card';
import { toMinsSecs } from '../../helpers/date-helpers';

const AverageTimeCard = (props) => {
  const { stats, username } = props;

  const daysParticipatedIn = Object.values(stats)
    .filter((day) => username in day);

  const avgTime = daysParticipatedIn.length > 0
    ? toMinsSecs((daysParticipatedIn.reduce((total, day) => total + day[username], 0) / daysParticipatedIn.length).toFixed(0))
    // ? `${(daysParticipatedIn.reduce((total, day) => total + day[username], 0) / daysParticipatedIn.lengt h).toFixed(0)} secs`
    : 'N/A';

  return (
    <>
      <NYTCard icon='area graph' header={avgTime} subheader='Average time' />
    </>
  );
};

AverageTimeCard.propTypes = {
  stats: PropTypes.object,
  username: PropTypes.string,
};

export default AverageTimeCard;
