import React, { useState } from 'react';
import styled from 'styled-components';
import ListInput from '../../components/ListInput/ListInput';
import ListButton from '../../components/ListButton/ListButton';

const Wrapper = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 15px;
  min-height: 50em;
  color: black;
  display: grid;
  grid-template-rows: 8% 8% 84%;
  grid-template-columns: 100%;
`;

const List = () => {
  const [inputItem, setInputItem] = useState({
    value: '',
    valid: true
  });
  const [listItems, setListItems] = useState([]);

  const inputChangedHandler = (event) => {
    setInputItem({ value: event.target.value });
  };

  const addNewItem = (newItem) => {
    setListItems([...listItems, newItem]);
  };

  return (
    <Wrapper>
      <ListInput changed={inputChangedHandler} value={inputItem.value} />
      <ListButton>Add new list item</ListButton>
    </Wrapper>
  );
};

export default React.memo(List);
