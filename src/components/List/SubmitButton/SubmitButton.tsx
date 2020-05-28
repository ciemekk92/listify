import React from 'react';
import { Button } from './SubmitButton.styled';

type ButtonProps = {
    clicked(): void;
};

const SubmitButton: React.FC<ButtonProps> = (props) => {
    return <Button onClick={props.clicked}>{props.children}</Button>;
};

export default SubmitButton;
