import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';


const NYTHeader = (props) => {
  const { level, content } = props;

  return (
    <Header content='hi' />
  );
};

NYTHeader.propTypes = {
  level: PropTypes.string,
  content: PropTypes.string,
};

export default NYTHeader;
