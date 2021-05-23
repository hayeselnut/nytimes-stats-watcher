import React from 'react';
import { Icon } from 'semantic-ui-react';
import NYTContainer from './components/imitations/nyt-container';

import NYTHeader from './components/imitations/nyt-header';

import './nyt.css';
import NYTLink from './components/imitations/nyt-link';

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const style = {
  display: 'flex',
  flexWrap: 'wrap',
};

const AppFooter = () => {
  return (
    <NYTContainer>
      <div style={style}>
        <div style={{ flex: 2 }}>
          <section>
            <NYTHeader level='h5' content='About' />
            <p>
              I{'\''}m too broke to pay for the official <NYTLink href='https://www.nytimes.com/puzzles/stats' target='_blank' rel="noreferrer">Statistics</NYTLink> so I made my own.
            </p>

            <p>
              A Python script scrapes the <NYTLink href='https://www.nytimes.com/puzzles/leaderboards' target='_blank' rel="noreferrer">Leaderboard</NYTLink> everyday
              and stores each player{'\''}s times into a Google Firestore database.
            </p>

            <p>
              Charts are rendered using the <code>chart.js</code> library and components
              have been styled to emulate the official NYT games pages.
            </p>
          </section>

          <section>
            <NYTHeader level='h5' content='Elo formula' />
            <p>
              I rolled a dice and pulled this out of my ass:
            </p>

            <BlockMath math="\frac{100000}{\text{sum of your most recent 7 game times}}" />
          </section>
        </div>

        <section style={{ flex: 1, marginLeft: '4rem' }}>
          <NYTHeader level='h5' content='Links' />
          <p>
            <NYTLink href='https://github.com/hayeselnut/nytimes-stats-watcher' target='_blank' rel="noreferrer">
              <Icon fitted name='github' /> GitHub
            </NYTLink>
          </p>

          <p>
            <NYTLink href='https://www.nytimes.com/crosswords/game/mini' target='_blank' rel="noreferrer">
              <Icon fitted name='grid layout' /> Mini Crossword
            </NYTLink>
          </p>

          <p>
            <NYTLink href='https://www.nytimes.com/puzzles/leaderboards' target='_blank' rel="noreferrer">
              <Icon fitted name='ordered list' /> Leaderboard
            </NYTLink>
          </p>
        </section>
      </div>
    </NYTContainer>
  );
};

export default AppFooter;
