import React from 'react';
import { Button } from './ListButton.styled';

const ListButton = (props) => {
    return <Button>{props.children}</Button>;
};

export default ListButton;
