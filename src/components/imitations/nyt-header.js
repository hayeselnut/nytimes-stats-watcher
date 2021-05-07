import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import { NYTColours } from './nyt-colours';

const styles = {
  h1: {
    fontFamily: 'Karnak',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontSize: '2.4rem',
    marginTop: -6,
  },
  h2: {
    fontFamily: 'Karnak',
    fontWeight: 400,
    fontSize: '2.625rem',
    fontStretch: 'condensed',
    lineHeight: '3.4125rem',
    letterSpacing: '0.05rem',
  },
  h3: {
    fontFamily: 'Franklin',
    fontWeight: 'bold',
  },
  h4: {
    fontFamily: 'Stymie',
    fontSize: '1.125rem',
    color: NYTColours.white,
  },
  h5: {
    fontFamily: 'Franklin',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '0.75px',
    marginTop: '15px',
  },
};

const NYTHeader = (props) => {
  const { level, content, textAlign } = props;

  return (
    <Header as={level} style={styles[level]} content={content} textAlign={textAlign || 'left'}>
      {props.children}
    </Header>
  );
};

NYTHeader.propTypes = {
  children: PropTypes.node,
  level: PropTypes.string,
  content: PropTypes.string,
  textAlign: PropTypes.string,

};

export default NYTHeader;
