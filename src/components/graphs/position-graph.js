import React from 'react';
import PropTypes from 'prop-types';

import Color from 'color';

import { Pie } from 'react-chartjs-2';

const style = {
  family: 'Franklin, sans-serif',
  size: 14,
};

const ordinalSuffixOf = (i) => {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

const occurence = (q) => {
  if (q === 1) return 'once';
  if (q === 2) return 'twice';
  return `${q} times`;
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

  const getPositionSummary = (stats, username) => {
    const positions = Object.values(stats).map((day) => getPosition(day, username));

    const positionsSummary = [];
    for (let rank = 1; rank <= Math.max(...positions); rank++) {
      positionsSummary.push(positions.filter((r) => r === rank).length);
    }
    return positionsSummary;
  };

  const data = {
    datasets: selectedUsers.map((username) => {
      const userColour = users.filter((user) => user.name === username)[0].colour;
      const positionSummary = getPositionSummary(stats, username);
      return {
        label: username,
        data: positionSummary,
        backgroundColor: `${userColour}`,
        backgroundColor: positionSummary.map((_, index) => new Color(userColour).lighten(index / 25).hex()),
        // borderColor: `${userColour}A0`,
        // spanGaps: true,
        // stepped: 'middle',
      };
    }),
  };

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
    interaction: {
      mode: 'dataset',
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
            const rank = context.dataIndex + 1;
            const quantity = context.parsed;

            if (quantity <= 0) return '';

            return `${ordinalSuffixOf(rank)} ${occurence(quantity)}`;
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
    <div>
      <Pie
        data={data}
        options={options}
        style={{ height: '60vh' }}
      />
    </div>
  );
};

PositionGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default PositionGraph;
