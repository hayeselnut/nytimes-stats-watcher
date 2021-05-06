import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

const LeaderboardStatsGraph = (props) => {
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
      <Line
        data={data}
        options={options}
        style={{ height: '80vh' }}
      />
    </>
  );
};

LeaderboardStatsGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default LeaderboardStatsGraph;
