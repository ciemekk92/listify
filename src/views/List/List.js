import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Wrapper } from './List.styled';
import ListInput from '../../components/ListInput/ListInput';
import ListButton from '../../components/ListButton/ListButton';
import ListContainer from '../../components/ListContainer/ListContainer';
import ListItem from '../../components/ListItem/ListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './List.css';

const List = () => {
    const [inputItem, setInputItem] = useState({
        id: uuidv4(),
        value: ''
    });
    const [listItems, setListItems] = useState([]);

    const inputChangedHandler = (event) => {
        setInputItem({ id: uuidv4(), value: event.target.value });
    };

    const addNewItem = (newItem) => {
        setListItems((items) => [...items, newItem]);
    };

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
            <ListContainer>
                <TransitionGroup className={'list'}>
                    {listItems.map(({ id, value }) => (
                        <CSSTransition key={id} timeout={500} classNames="move">
                            <ListItem
                                name={value}
                                clicked={() =>
                                    setListItems((items) =>
                                        items.filter((item) => item.id !== id)
                                    )
                                }
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListContainer>
        </Wrapper>
    );
};

export default React.memo(List);
