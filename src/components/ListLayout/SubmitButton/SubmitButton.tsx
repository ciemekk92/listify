import React from 'react';
import { Button } from './SubmitButton.styled';

type ButtonProps = {
    clicked(): void;
    selected: boolean;
};

const SubmitButton: React.FC<ButtonProps> = (props) => {
    const { selected, clicked } = props;
    return (
        <Button selected={selected} onClick={clicked}>
            {props.children}
        </Button>
    );
};

export default SubmitButton;
