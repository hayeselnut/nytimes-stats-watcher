import firebase from 'firebase';
import 'firebase/firestore';
import FirebaseConfig from '../assets/firebaseConfig.json';
import { NYTThemeColours } from '../components/imitations/nyt-colours';

export const getSnapshot = async () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
  }
  const db = firebase.firestore();
  return await db.collection('leaderboards').get();
};

export const getNewStats = async () => {
  const snapshot = await getSnapshot();
  const newStats = {};
  snapshot.forEach((doc) => {
    newStats[doc.id] = doc.data();
  });
  return newStats;
};

export const getNewUsers = (newStats) => {
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

export const calculateElo = (times) => {
  const sum = times.reduce((a, b) => a + b, 0);
  return (100_000 / sum).toFixed(0);
};

export const getElo = (stats, users) => {
  const period = 7; // Use last n games to calculate
  const elo = {};
  const userTimeCache = users.reduce((cache, user) => ({ ...cache, [user.name]: [] }), {});

  Object.entries(stats).forEach(([date, dayStats]) => {
    Object.entries(dayStats).forEach(([username, seconds]) => {
      if (userTimeCache[username]?.length >= period) {
        userTimeCache[username]?.shift();
      }

      userTimeCache[username]?.push(seconds);
    });

    const dayElo = {};
    users.forEach((user) => {
      if (userTimeCache[user.name]?.length >= period) {
        dayElo[user.name] = calculateElo(userTimeCache[user.name]);
      }
    });

    if (Object.keys(dayElo).length > 0) {
      elo[date] = dayElo;
    }
  });

  return elo;
};
