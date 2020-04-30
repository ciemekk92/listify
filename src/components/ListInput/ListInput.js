import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 80%;
  height: 30px;
  border-radius: 10px;
  outline: none;
  font-family: 'Open Sans Condensed';
  font-size: 16px;
  text-align: center;
  grid-row-start: 1;
  grid-row-end: auto;
  place-self: center;
`;

const ListInput = (props) => {
  return (
    <Input
      label={'Add new list item'}
      onChange={props.changed}
      placeholder={'Type in the task you want to add to your list!'}
      value={props.value}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          props.submit();
        }
      }}
    />
  );
};

export default ListInput;
