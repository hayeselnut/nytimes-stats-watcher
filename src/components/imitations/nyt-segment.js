import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

const style = {
  borderRadius: '7px',
  padding: '1rem',
};

const NYTSegment = (props) => {
  return (
    <Segment style={style}>
      {props.children}
    </Segment>
  );
};

NYTSegment.propTypes = {
  children: PropTypes.node,
};

export default NYTSegment;
