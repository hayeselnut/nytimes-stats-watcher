const days = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

export const getDayOfWeek = (date) => {
  return days[new Date(date).getDay()];
};

export const prettyPrint = (date) => {
  return new Date(date).toDateString().slice(4, -5);
};

export const toMinsSecs = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
