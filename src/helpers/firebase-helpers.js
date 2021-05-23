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
