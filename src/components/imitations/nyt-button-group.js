import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { NYTColours } from './nyt-colours';

const NYTButtonGroup = (props) => {
  const { state, setState } = props;

  const buttonStyle = (value, first, last) => ({
    width: 150,
    height: '2rem',
    fontWeight: 'normal',
    padding: '0 1rem',
    backgroundColor: state === value ? NYTColours.blue : NYTColours.white,
    color: state === value ? NYTColours.white : NYTColours.blue,

    borderRadius: first ? '100px 0px 0px 100px' : last ? '0px 100px 100px 0px' : '0px',
    borderStyle: 'solid',
    borderColor: state === value ? 'transparent' : NYTColours.blue,
    borderWidth: last ? '2px' : '2px 0px 2px 2px',
  });

  return (
    <Button.Group style={{ marginBottom: '1rem', marginTop: '1rem' }}>
      {props.children.map((child, i) => {
        const first = i === 0;
        const last = i === props.children.length - 1;

        return (
          <Button
            key={i}
            content={child.props.content}
            onClick={() => setState(child.props.value)}
            style={buttonStyle(child.props.value, first, last)}
          />
        );
      })}
    </Button.Group>
  );
};

NYTButtonGroup.propTypes = {
  children: PropTypes.node,
  state: PropTypes.string,
  setState: PropTypes.func,
  buttons: PropTypes.object,
};

export default NYTButtonGroup;
