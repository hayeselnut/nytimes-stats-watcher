import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

const LeaderboardStatsGraph = (props) => {
  const { stats, selectedUsers } = props;

  const data = {
    labels: Object.keys(stats),
    datasets: selectedUsers.map((username) => ({
      label: username,
      data: Object.keys(stats).map((day) => stats[day][username]),
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    })),
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
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
  selectedUsers: PropTypes.array,
};

export default LeaderboardStatsGraph;
