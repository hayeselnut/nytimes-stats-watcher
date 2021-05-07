import React, { useEffect, useState } from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import firebase from 'firebase';
import 'firebase/firestore';
import FirebaseConfig from './assets/firebaseConfig.json';

import LeaderboardStatsGraph from './components/leaderboard-stats-graph';
import UserSelector from './components/user-selector';
import NYTHeader from './components/imitations/nyt-header';
import NYTContainer from './components/imitations/nyt-container';
import { NYTColours, NYTThemeColours } from './components/imitations/nyt-colours';
import NYTCard from './components/imitations/nyt-card';
import PersonalStats from './components/personalStats';

const getSnapshot = async () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
  }

  const db = firebase.firestore();
  return await db.collection('leaderboards').get();
};

const getNewStats = async () => {
  const snapshot = await getSnapshot();

  const newStats = {};
  snapshot.forEach((doc) => {
    newStats[doc.id] = doc.data();
  });

  return newStats;
};

const getNewUsers = (newStats) => {
  const colours = Object.values(NYTThemeColours);
  let allUsernames = [];

  Object.values(newStats).map((day) => {
    allUsernames = [...allUsernames, ...Object.keys(day)];
  });
  const unionUsernames = [...new Set(allUsernames)];
  const newUsernames = unionUsernames.sort((a, b) => a.localeCompare(b, 'en', { 'sensitivity': 'base' }));

  return newUsernames.map((username, index) => ({
    name: username,
    colour: colours[index % colours.length],
  }));
};


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
    setSelectedUsernames(newUsers.map((user) => user.name));

    setLoading(false);
  }, []);

  return (
    <div style={{ borderTop: `1px solid ${NYTColours.lightGrey}` }} >
      <Grid>
        <Grid.Row>
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
