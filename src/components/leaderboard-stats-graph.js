import React, { useState } from 'react';

const LeaderboardStatsGraph = (props) => {
  const { selectedUsers } = props;

  return (
    <>
      {selectedUsers}
    </>
  );
};

LeaderboardStatsGraph.propTypes = {
  selectedUsers: Array,
};

export default LeaderboardStatsGraph;
