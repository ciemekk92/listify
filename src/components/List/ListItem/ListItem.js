import React from 'react';
import { Item, Date, Name } from './ListItem.styled';

const ListItem = (props) => {
    const { clicked, name, date } = props;
    return (
        <Item onClick={clicked}>
            <Name>{name}</Name>
            <Date>{date}</Date>
        </Item>
    );
};

export default React.memo(ListItem);
