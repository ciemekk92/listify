import React from 'react';
import { Item, Paragraph } from './ListItem.styled';

const ListItem = (props) => {
    return (
        <Item>
            <Paragraph>{props.name}</Paragraph>
        </Item>
    );
};

export default React.memo(ListItem);
