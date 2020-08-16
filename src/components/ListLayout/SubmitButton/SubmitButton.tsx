import React from 'react';
import { Button } from './SubmitButton.styled';

type ButtonProps = {
    clicked(): void;
    selected: boolean;
    open: boolean;
};

const SubmitButton: React.FC<ButtonProps> = (props) => {
    const { selected, clicked, open } = props;
    return (
        <Button open={open} selected={selected} onClick={clicked}>
            {props.children}
        </Button>
    );
};

export default SubmitButton;
