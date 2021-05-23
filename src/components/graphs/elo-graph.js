import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

import { prettyPrint } from '../../helpers/date-helpers';

const style = {
  family: 'Franklin, sans-serif',
  size: 14,
};

const EloGraph = (props) => {
  const { eloToDisplay, users, selectedUsers } = props;

  const data = {
    labels: Object.keys(eloToDisplay).map((date) => prettyPrint(date)),
    datasets: selectedUsers.map((username) => {
      const userColour = users.filter((user) => user.name === username)[0].colour;

      return {
        label: username,
        data: Object.values(eloToDisplay).map((day) => day[username]),
        backgroundColor: userColour,
        borderColor: `${userColour}A0`,
        spanGaps: true,
        cubicInterpolationMode: 'monotone',
        lineTension: 0.40,
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
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        display: true,
        // suggestedMax: 120,
        // max: subminute ? 60 : null,
        title: {
          display: true,
          text: 'Elo rating',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        itemSort: (a, b) => b.dataset.data[b.dataIndex] - a.dataset.data[a.dataIndex],
        titleFont: style,
        bodyFont: style,
        fotterFont: style,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div style={{ flexGrow: 1 }}>
        <Line
          data={data}
          options={options}
          style={{ height: '60vh' }}
        />
      </div>
    </>
  );
};

EloGraph.propTypes = {
  eloToDisplay: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default EloGraph;
