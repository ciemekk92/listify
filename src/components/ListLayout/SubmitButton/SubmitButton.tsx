import React from 'react';
import { Button } from './SubmitButton.styled';

type ButtonProps = {
    clicked(): void;
};

const SubmitButton: React.FC<ButtonProps> = (props) => {
    const { clicked } = props;
    return <Button onClick={clicked}>{props.children}</Button>;
};

export default SubmitButton;
