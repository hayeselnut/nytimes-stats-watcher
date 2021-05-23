import React from 'react';
import PropTypes from 'prop-types';

import NYTCard from '../imitations/nyt-card';
import { ordinalSuffixOf } from '../../helpers/english-helpers';

const getPosition = (sortedLatestElos, username) => {
  for (const [index, [currName, currTime]] of sortedLatestElos.entries()) {
    if (username === currName) {
      if (index > 0) {
        const [prevName, prevTime] = sortedLatestElos[index - 1];
        if (prevTime === currTime) return getPosition(sortedLatestElos, prevName);
      }
      return index + 1;
    }
  }
};

const OverallPositionCard = (props) => {
  const { elo, username } = props;

  const latestElos = Object.values(elo).slice(-1)[0] || {};

  const sortedLatestElos = Object.entries(latestElos).sort(([, a], [, b]) => b - a);

  const position = username in latestElos
    ? ordinalSuffixOf(getPosition(sortedLatestElos, username))
    : 'N/A';

  return <NYTCard emoji='🆚' header={`${position}`} subheader='Overall rank' />;
};

OverallPositionCard.propTypes = {
  elo: PropTypes.object,
  username: PropTypes.string,
};

export default OverallPositionCard;
