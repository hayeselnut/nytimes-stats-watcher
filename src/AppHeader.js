import React from 'react';

import NYTHeader from './components/imitations/nyt-header';

import GamesLogo from './assets/games.svg';

const style = {
  height: '65px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const AppHeader = () => {
  return (
    <div style={style} >
      <img src={GamesLogo} />
      <NYTHeader level='h1' content='Stats Watcher' />
    </div>
  );
};

export default AppHeader;
