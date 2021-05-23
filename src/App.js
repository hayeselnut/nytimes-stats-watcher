import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import LeaderboardStatsGraph from './components/leaderboard-stats-graph';
import UserSelector from './components/user-selector';
import NYTContainer from './components/imitations/nyt-container';
import { NYTColours } from './components/imitations/nyt-colours';
import PersonalStats from './components/personalStats';

import { getUsernamesInURL } from './helpers/url-helpers';
import { getNewStats, getNewUsers } from './helpers/firebase-helpers';
import NYTSegment from './components/imitations/nyt-segment';

const App = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  useEffect(async () => {
    const newStats = await getNewStats();
    setStats(newStats);

    const newUsers = getNewUsers(newStats);
    setUsers(newUsers);
    setSelectedUsernames(getUsernamesInURL(newUsers));

    setLoading(false);
  }, []);

  return (
    <div style={{ borderTop: `1px solid ${NYTColours.lightGrey}` }} >
      <Grid>
        <Grid.Row>
          <NYTContainer>
            <UserSelector users={users} selectedUsernames={selectedUsernames} setSelectedUsernames={setSelectedUsernames} />

            <NYTSegment>
              <LeaderboardStatsGraph stats={stats} users={users} selectedUsers={selectedUsernames} />
            </NYTSegment>
          </NYTContainer>
        </Grid.Row>
        <Grid.Row style={{ backgroundColor: NYTColours.blue }}>
          <NYTContainer>
            <PersonalStats users={users} stats={stats} />
          </NYTContainer>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default App;
