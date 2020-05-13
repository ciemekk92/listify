import React from 'react';
import { Button } from './ModalButton.styled';

const ModalButton = (props) => {
    return <Button onClick={props.clicked}>{props.children}</Button>;
};

export default ModalButton;
