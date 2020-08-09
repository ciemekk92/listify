import React from 'react';
import { Item, Date, Name } from './ListItem.styled';
import ListItemButton from '../ListItemButton/ListItemButton';

const ListItem = (props: {
    clicked(): void;
    clickedComplete(): void;
    clickedDelete(): void;
    completed: boolean;
    selected: boolean;
    name: string;
    date: Date;
}) => {
    const {
        clicked,
        clickedComplete,
        clickedDelete,
        completed,
        selected,
        name,
        date
    } = props;

    const completeHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        clickedComplete();
    };

    const deleteHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        clickedDelete();
    };

    return (
        <Item completed={completed} onClick={clicked} selected={selected}>
            <Name>{name}</Name>
            <Date>{date}</Date>
            {completed ? null : (
                <ListItemButton
                    complete={true}
                    completed={completed}
                    delete={false}
                    clicked={(event) => completeHandler(event)}
                />
            )}
            <ListItemButton
                complete={false}
                completed={completed}
                delete={true}
                clicked={deleteHandler}
            />
        </Item>
    );
};

export default React.memo(ListItem);
