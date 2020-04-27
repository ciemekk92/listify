import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: transparent;
  border: 2px solid #b83b5e;
  border-radius: 5px;
  color: purple;
  outline: none;
  font-family: 'Open Sans Condensed';
  font-size: 16px;
`;

const Button = (props) => {
  return <StyledButton>{props.children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Button;
