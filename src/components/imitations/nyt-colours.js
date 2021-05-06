const NYTThemeColours = {
  blue: '#4d88f9',
  teal: '#00a2b3',
  green: '#b5e352',
  yellow: '#f7da21',
  orange: '#fb9b00',
  red: '#e05c56',
  darkBlue: '#2860d8',
  darkerBlue: '#183167',
  darkGreen: '#47A590',
  darkRed: '#E13246',
  lightGreen: '#54E984',
  lightRed: '#EFADAA',
};

const NYTGreyscaleColours = {
  white: '#ffffff',
  offWhite: '#FAFAFA',
  lightGrey: '#cccccc',
  grey: '#959595',
  darkGrey: '#333333',
  black: '#000000',
};

const NYTColours = { ...NYTThemeColours, ...NYTGreyscaleColours };

export { NYTThemeColours, NYTGreyscaleColours, NYTColours };
