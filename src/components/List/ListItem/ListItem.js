import React from 'react';
import { Item, Date, Name } from './ListItem.styled';
import ListItemButton from '../ListItemButton/ListItemButton';

const ListItem = (props) => {
    const {
        clicked,
        clickedComplete,
        clickedDelete,
        completed,
        name,
        date
    } = props;

    const completeHandler = (event) => {
        event.stopPropagation();
        clickedComplete();
    };

    const deleteHandler = (event) => {
        event.stopPropagation();
        clickedDelete();
    };

    return (
        <Item completed={completed} onClick={clicked}>
            <Name>{name}</Name>
            <Date>{date}</Date>
            {!completed ? (
                <ListItemButton
                    complete
                    completed={completed}
                    clicked={completeHandler}
                />
            ) : null}
            <ListItemButton
                completed={completed}
                delete
                clicked={deleteHandler}
            />
        </Item>
    );
};

export default React.memo(ListItem);
