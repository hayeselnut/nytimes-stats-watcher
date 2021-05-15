import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import { Button } from 'semantic-ui-react';

const PositionGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const data = {
    labels: Object.keys(stats),
    datasets: selectedUsers.map((username) => {
      const userColour = users.filter((user) => user.name === username)[0].colour;

      return {
        label: username,
        data: Object.keys(stats).map((day) => stats[day][username]),
        backgroundColor: userColour,
        borderColor: `${userColour}80`,
      };
    }),
  };

  const options = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          // TODO also draw lines when missing data
          // TODO: make max 60 an option
          max: 60,
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          // TODO: not working :(
          labelString: 'seconds',
        },
      }],
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div>
        <Line
          data={data}
          options={options}
          style={{ height: '60vh' }}
        />
      </div>
    </>
  );
};

PositionGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default PositionGraph;
