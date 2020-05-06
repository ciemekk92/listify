import React from 'react';
import { Item } from './ListItem.styled';

const ListItem = (props) => {
    return <Item onClick={props.clicked}>{props.name}</Item>;
};

export default React.memo(ListItem);
