import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 80%;
  height: 50%;
  background-color: transparent;
  border: 2px solid #b83b5e;
  border-radius: 5px;
  margin: 0;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.25);
  color: purple;
  outline: none;
  font-family: 'Open Sans Condensed';
  font-size: 16px;
  grid-column-start: ${(props) => (props.login ? '3' : '4')};
  grid-column-end: auto;
  place-self: center;
  transition: all 0.25s ease-in;

  &:hover {
    width: 83%;
    height: 55%;
  }
`;

const LoginButton = (props) => {
  return <StyledButton login={props.login}>{props.children}</StyledButton>;
};

LoginButton.propTypes = {
  children: PropTypes.string.isRequired
};

export default LoginButton;
