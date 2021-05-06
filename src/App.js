import React, { useEffect, useState } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import firebase from 'firebase';
import 'firebase/firestore';
import FirebaseConfig from './assets/firebaseConfig.json';

import LeaderboardStatsGraph from './components/leaderboard-stats-graph';
import UserSelector from './components/user-selector';
import NYTHeader from './components/imitations/nyt-header';
import NYTContainer from './components/imitations/nyt-container';

const App = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(async () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(FirebaseConfig);
    }

    const db = firebase.firestore();

    const snapshot = await db.collection('leaderboards').get();

    const newStats = {};
    let allUsers = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      newStats[doc.id] = data;
      allUsers = [...allUsers, ...Object.keys(data)];
    });
    const unionUsers = [...new Set(allUsers)];
    const newUsers = unionUsers.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    console.log(newUsers);

    setStats(newStats);
    setUsers(newUsers);
    setSelectedUsers(newUsers);
    setLoading(false);
  }, []);

  return (
    <div style={{ borderTop: '1px solid var(--nyt-light-grey)' }} >
      <NYTContainer>
        <Grid columns='equal'>
          <Grid.Column width={4}>
            <NYTHeader level='h3' content='Usernames' />
            <UserSelector users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <LeaderboardStatsGraph stats={stats} selectedUsers={selectedUsers} />
            </Segment>
          </Grid.Column>
        </Grid>
      </NYTContainer>
    </div>
  );
};

export default App;
