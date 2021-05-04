import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';

import firebase from 'firebase';
import 'firebase/firestore';
import FirebaseConfig from './assets/firebaseConfig.json';

import LeaderboardStatsGraph from './components/leaderboard-stats-graph';
import UserSelector from './components/user-selector';

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
    let newUsers = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      newStats[doc.id] = data;
      newUsers = [...newUsers, ...Object.keys(data)];
    });

    console.log(newUsers);

    setStats(newStats);
    setUsers([...new Set(newUsers)]);
    setLoading(false);
  }, []);

  return (
    <>
      <header>
        New York Times Stats Watcher 👀
      </header>
      <main>
        <Container>
          {loading ? 'still loading...' : 'done'}
          <UserSelector users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
          <LeaderboardStatsGraph selectedUsers={selectedUsers} />
        </Container>
      </main>
    </>
  );
};

export default App;
