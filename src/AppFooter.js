import React from 'react';
import { Container, Grid, Icon, Image, Segment } from 'semantic-ui-react';
import NYTContainer from './components/imitations/nyt-container';

import NYTHeader from './components/imitations/nyt-header';

import MiniCrosswordLogo from './assets/mini.svg';

const style = {
  display: 'flex',
  flexWrap: 'wrap',
};

const iconStyle = {
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  display: 'inline-block',
  minHeight: '20px',
  minWidth: '20px',
  marginRight: '8px',
};

const AppFooter = () => {
  return (
    <NYTContainer>
      <div style={style}>
        <section style={{ flex: 2 }}>
          <NYTHeader level='h4' content='About' />
          <p>
            I{'\''}m too broke to pay for the official <a href='https://www.nytimes.com/puzzles/stats' target='_blank' rel="noreferrer">Statistics</a> so I made my own.
          </p>

          <p>
            A Python script scrapes the <a href='https://www.nytimes.com/puzzles/leaderboards' target='_blank' rel="noreferrer">Leaderboard</a> everyday
            and stores each player{'\''}s times into a Google Firestore database.
          </p>
        </section>

        <section style={{ flex: 1, marginLeft: '4rem' }}>
          <NYTHeader level='h4' content='Links' />
          <p>
            <a href='https://github.com/hayeselnut/nytimes-stats-watcher' target='_blank' rel="noreferrer">
              <Icon fitted name='github' /> GitHub
            </a>
          </p>

          <p>
            <a href='https://www.nytimes.com/crosswords/game/mini' target='_blank' rel="noreferrer">
              <Icon fitted name='square full' /> GitHubMini Crossword
            </a>
          </p>

          <p>
            <a href='https://www.nytimes.com/puzzles/leaderboards' target='_blank' rel="noreferrer">
              <Icon fitted name='trophy' /> Leaderboard
            </a>
          </p>
        </section>
      </div>
    </NYTContainer>
  );
};

export default AppFooter;
