import React from 'react';
import { Item, Date, Name } from './ListItem.styled';
import ListItemButton from '../ListItemButton/ListItemButton';

const ListItem = (props) => {
    const { clickedComplete, clickedDelete, completed, name, date } = props;
    return (
        <Item completed={completed}>
            <Name>{name}</Name>
            <Date>{date}</Date>
            {!completed ? (
                <ListItemButton
                    complete
                    completed={completed}
                    clicked={clickedComplete}
                />
            ) : null}
            <ListItemButton
                completed={completed}
                delete
                clicked={clickedDelete}
            />
        </Item>
    );
};

export default React.memo(ListItem);
