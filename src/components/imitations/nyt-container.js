import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

const NYTContainer = (props) => {
  return (
    <Container style={{ paddingTop: '24px', paddingBottom: '24px' }}>
      {props.children}
    </Container>
  );
};

NYTContainer.propTypes = {
  children: PropTypes.node,
};

export default NYTContainer;
