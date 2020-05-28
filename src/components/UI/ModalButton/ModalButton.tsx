import React from 'react';
import { Button } from './ModalButton.styled';

type ButtonProps = {
    clicked(): void;
};

const ModalButton: React.FC<ButtonProps> = (props) => {
    return <Button onClick={props.clicked}>{props.children}</Button>;
};

export default ModalButton;
