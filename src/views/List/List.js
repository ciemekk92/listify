import React, { useState } from 'react';
import styled from 'styled-components';
import ListInput from '../../components/ListInput/ListInput';
import ListButton from '../../components/ListButton/ListButton';
import ListContainer from '../../components/ListContainer/ListContainer';
import ListItem from '../../components/ListItem/ListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './List.css';

const Wrapper = styled.div`
    width: 80%;
    background-color: white;
    border-radius: 15px;
    min-height: 50em;
    color: black;
    display: grid;
    grid-template-rows: 10% 8% 82%;
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
        setListItems([newItem, ...listItems]);
    };

    let items = listItems.map((element) => {
        return (
            <CSSTransition
                key={Math.random() * 100}
                timeout={500}
                classNames="move"
            >
                <ListItem name={element.value} />
            </CSSTransition>
        );
    });
    // TODO IMPORTANT Split list container and input/button into separate components, fix transitions
    return (
        <Wrapper>
            <ListInput changed={inputChangedHandler} value={inputItem.value} />
            <ListButton
                clicked={() => {
                    addNewItem(inputItem);
                }}
            >
                Add new list item
            </ListButton>

            <TransitionGroup>{items}</TransitionGroup>
        </Wrapper>
    );
};

export default React.memo(List);
