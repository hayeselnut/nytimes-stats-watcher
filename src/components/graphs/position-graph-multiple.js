import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';

import NYTHeader from '../imitations/nyt-header';
import { ordinalSuffixOf, occurence } from '../../helpers/english-helpers';

const style = {
  family: 'Franklin, sans-serif',
  size: 14,
};

const PositionGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const getPosition = (day, username) => {
    const sortedByTimes = Object.entries(day)
      .filter(([username, time]) => selectedUsers.includes(username))
      .sort((a, b) => a[1] - b[1]);

    for (const [index, element] of sortedByTimes.entries()) {
      if (username === element[0]) {
        if (index > 0 && sortedByTimes[index - 1][1] === element[1]) {
          return getPosition(day, sortedByTimes[index - 1][0]);
        }

        return index + 1;
      }
    }
    return null;
  };

  const getPositionSummary = (username) => {
    const positions = Object.values(stats).map((day) => getPosition(day, username));

    const positionsSummary = [];
    for (let rank = 1; rank <= Math.max(...positions); rank++) {
      positionsSummary.push(positions.filter((r) => r === rank).length);
    }
    return positionsSummary;
  };

  const positionSummary = selectedUsers.reduce((summary, username) => ({
    ...summary,
    [username]: getPositionSummary(username),
  }), {});

  const getPositions = (index) => {
    return {
      label: ordinalSuffixOf(index + 1),
      data: selectedUsers.map((username) => {
        return positionSummary[username][index];
      }),
      backgroundColor: selectedUsers.map((username) => {
        return users.filter((user) => user.name === username)[0].colour;
      }),
    };
  };

  const getData = (index) => ({
    datasets: [getPositions(index)],
  });

  let delayed;
  const options = {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 50 + context.datasetIndex * 50;
        }
        return delay;
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return context[0].dataset.label;
          },
          label: (context) => {
            const username = selectedUsers[context.dataIndex];
            const quantity = context.parsed;

            if (quantity <= 0) return '';

            return `${username}: ${occurence(quantity)}`;
          },
        },
        titleFont: style,
        bodyFont: style,
        fotterFont: style,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <Pie data={getData(0)} options={options} />
        </div>
        <NYTHeader level='h3' content={ordinalSuffixOf(1)}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <Pie data={getData(1)} options={options} />
        </div>
        <NYTHeader level='h3' content={ordinalSuffixOf(2)}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <Pie data={getData(2)} options={options} />
        </div>
        <NYTHeader level='h3' content={ordinalSuffixOf(3)}/>
      </div>
    </div>
  );
};

PositionGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default PositionGraph;
