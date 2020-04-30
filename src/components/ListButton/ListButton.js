import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 10%;
  height: 50%;
  background-color: transparent;
  border: 2px solid #b83b5e;
  border-radius: 5px;
  margin: 0;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.25);
  color: black;
  outline: none;
  font-family: 'Open Sans Condensed';
  font-size: 16px;
  grid-row-start: 2;
  grid-row-end: auto;
  place-self: center;
  transition: all 0.25s ease-in;

  &:hover {
    width: 12%;
    height: 55%;
    font-size: 17px;
  }
`;

const ListButton = (props) => {
  return <Button>{props.children}</Button>;
};

export default ListButton;
