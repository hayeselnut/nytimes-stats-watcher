import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import firebase from 'firebase';
import 'firebase/firestore';
import FirebaseConfig from './assets/firebaseConfig.json';

import LeaderboardStatsGraph from './components/leaderboard-stats-graph';
import UserSelector from './components/user-selector';
import NYTHeader from './components/imitations/nyt-header';
import NYTContainer from './components/imitations/nyt-container';
import { NYTThemeColours } from './components/imitations/nyt-colours';

const App = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  useEffect(async () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(FirebaseConfig);
    }

    const db = firebase.firestore();
    const snapshot = await db.collection('leaderboards').get();

    const colours = Object.values(NYTThemeColours);
    const newStats = {};
    let allUsernames = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      newStats[doc.id] = data;
      allUsernames = [...allUsernames, ...Object.keys(data)];
    });
    const unionUsernames = [...new Set(allUsernames)];
    const newUsernames = unionUsernames.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const newUsers = newUsernames.map((username, index) => ({
      name: username,
      colour: colours[index % colours.length],
    }));

    setStats(newStats);
    setUsers(newUsers);
    setSelectedUsernames(newUsers.map((user) => user.name));
    setLoading(false);
  }, []);

  return (
    <div style={{ borderTop: '1px solid var(--nyt-light-grey)' }} >
      <NYTContainer>
        <Grid columns='equal'>
          <Grid.Column width={4}>
            <NYTHeader level='h3' content='Usernames' />
            <UserSelector users={users} selectedUsernames={selectedUsernames} setSelectedUsernames={setSelectedUsernames} />
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <LeaderboardStatsGraph stats={stats} users={users} selectedUsers={selectedUsernames} />
            </Segment>
          </Grid.Column>
        </Grid>
      </NYTContainer>
    </div>
  );
};

export default App;
