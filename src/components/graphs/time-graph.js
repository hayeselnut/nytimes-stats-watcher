import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import { Button } from 'semantic-ui-react';
import { prettyPrint, toMinsSecs } from '../../helpers/date-helpers';

const style = {
  family: 'Franklin, sans-serif',
  size: 14,
};

const TimeGraph = (props) => {
  const { stats, users, selectedUsers } = props;
  const [subminute, setSubminute] = useState(false);

  const data = {
    labels: Object.keys(stats).map((date) => prettyPrint(date)),
    datasets: selectedUsers.map((username) => {
      const userColour = users.filter((user) => user.name === username)[0].colour;

      return {
        label: username,
        data: Object.values(stats).map((day) => day[username]),
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
        suggestedMax: 120,
        max: subminute ? 60 : null,
        title: {
          display: true,
          text: 'Time (secs)',
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
        callbacks: {
          label: (context) => {
            const username = context.dataset.label;
            const time = context.parsed.y;
            return `${username} - ${toMinsSecs(time)}`;
          },
        },
        itemSort: (a, b) => {
          return a.dataset.label.toLowerCase()
            .localeCompare(b.dataset.label.toLowerCase());
        },
        titleFont: style,
        bodyFont: style,
        fotterFont: style,
      },
    },
    maintainAspectRatio: false,
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

TimeGraph.propTypes = {
  stats: PropTypes.object,
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
};

export default TimeGraph;
