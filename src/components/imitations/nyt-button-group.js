import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { NYTColours } from './nyt-colours';

const NYTButtonGroup = (props) => {
  const { state, setState, buttons, vertical } = props;

  const buttonGroupStyle = {
    margin: `1rem ${vertical ? '-8rem' : '0'}`,
    transform: vertical ? 'rotate(-90deg)' : 'none',
  };

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
    <Button.Group style={buttonGroupStyle}>
      {buttons.map(({ content, value }, i) => {
        const first = i === 0;
        const last = i === buttons.length - 1;

        return (
          <Button
            key={i}
            content={content}
            onClick={() => setState(value)}
            style={buttonStyle(value, first, last)}
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
  vertical: PropTypes.bool,
};

export default NYTButtonGroup;
