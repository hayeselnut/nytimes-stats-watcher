import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

const NYTSegment = (props) => {
  return (
    <Segment style={{ borderRadius: '7px' }}>
      {props.children}
    </Segment>
  );
};

NYTSegment.propTypes = {
  children: PropTypes.node,
};

export default NYTSegment;
