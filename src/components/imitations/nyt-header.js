import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import '../../nyt.css';

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
  const { level, content } = props;

  return (
    <Header as={level} style={styles[level]} content={content} />
  );
};

NYTHeader.propTypes = {
  level: PropTypes.string,
  content: PropTypes.string,
};

export default NYTHeader;
