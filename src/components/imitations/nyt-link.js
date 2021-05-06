import React from 'react';
import PropTypes from 'prop-types';

const style = {
  color: 'var(--nyt-black)',
};

const NYTLink = (props) => {
  const { href, target, rel } = props;
  return (
    <a href={href} target={target} rel={rel} style={style}>
      {props.children}
    </a>
  );
};

NYTLink.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  children: PropTypes.node,
};

export default NYTLink;
