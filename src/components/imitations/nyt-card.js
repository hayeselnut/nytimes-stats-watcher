import React from 'react';
import PropTypes from 'prop-types';

import { Segment } from 'semantic-ui-react';

import { NYTColours } from './nyt-colours';
import NYTHeader from './nyt-header';


const NYTCard = (props) => {
  const { emoji, header, subheader, content, large } = props;

  const style = {
    width: large ? '705px' : '208px',
    height: large ? '480px' : '290px',
    // width: large ? '37.6rem' : '16.8rem',
    // height: large ? '25.6rem' : '23.2rem',
    margin: '20px 10px',
    borderRadius: '7px',
    boxShadow: `0 7px 0 0 ${NYTColours.darkBlue}`,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Segment style={style}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }} >
          <span style={{ fontSize: '3rem', display: 'block', margin: '4rem 0 1rem' }}>
            {emoji}
          </span>

          <NYTHeader level='h2' content={header}/>

          <span style={{ fontSize: '1.125rem', display: 'block' }}>
            {content || ''}
          </span>
        </div>

        <hr style={{ lineHeight: 1.5, background: NYTColours.lightGrey, border: 0, height: '1px', width: '80%' }}/>
        <span style={{ textTransform: 'uppercase', color: NYTColours.grey, fontSize: '1rem', lineHeight: '1.1375rem', marginBottom: '1rem' }}>
          {subheader}
        </span>
      </div>
    </Segment>
  );
};

NYTCard.propTypes = {
  children: PropTypes.node,
  emoji: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  content: PropTypes.string,
  large: PropTypes.bool,
};

export default NYTCard;
