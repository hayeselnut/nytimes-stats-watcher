import Color from 'color';

const NYTThemeColours = {
  blue: '#4d88f9',
  teal: '#00a2b3',
  lime: '#5BC383',
  green: '#b5e352',
  yellow: '#f7da21',
  orange: '#fb9b00',
  red: '#e05c56',
  purple: '#D57DE8',
  pink: '#FF7DBB',
  poop: '#C4A574',
  brown: '#A1627E',
  darkBlue: '#2860d8',
};

const NYTGreyscaleColours = {
  white: '#ffffff',
  offWhite: '#FAFAFA',
  lightGrey: '#cccccc',
  grey: '#959595',
  darkGrey: '#333333',
  black: '#000000',
};

const darken = (color) => new Color(color).darken(0.15).string();

const NYTColours = { ...NYTThemeColours, ...NYTGreyscaleColours };

export { NYTThemeColours, NYTGreyscaleColours, NYTColours, darken };
