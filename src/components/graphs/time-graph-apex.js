import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-apexcharts';
import { Button } from 'semantic-ui-react';
import { getDayOfWeek, prettyPrint } from '../../helpers/date-helpers';

const style = {
  fontSize: '14px',
  fontFamily: 'Franklin, sans-serif',
};

const TimeGraph = (props) => {
  const { stats, users, selectedUsers } = props;

  const [subminute, setSubminute] = useState(false);

  const series = selectedUsers.map((username) => ({
    name: username,
    data: Object.values(stats).map((day) => day[username] || 0),
  }));

  const options = {
    chart: {
      animations: {
        animateGradually: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: true,
        },
      },
      id: 'times',
    },
    colors: selectedUsers.map((username) => users.filter((user) => user.name === username)[0].colour),
    labels: Object.keys(stats),
    legend: {
      ...style,
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    markers: {
      size: 2,
      strokeWidth: 0,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
      style: style,
      y: {
        formatter: (value) => value ? `${value} secs` : 'N/A',
      },
    },
    xaxis: {
      labels: {
        style: style,
        formatter: (value) => prettyPrint(value),
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      max: subminute ? 60 : (max) => max,
      forceNiceScale: true,
      labels: {
        style: style,

      },
      title: {
        text: 'Time (secs)',
        style: style,
      },
    },
  };

  return (
    <>
      <Button.Group>
        <Button
          content='Subminute'
          onClick={() => setSubminute(true)}
        />
        <Button
          content='All'
          onClick={() => setSubminute(false)}
        />
      </Button.Group>

      <Chart
        options={options}
        series={series}
        type='line'
      />
    </>
  );
};

TimeGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default TimeGraph;
