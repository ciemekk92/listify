import React from 'react';
import { Button } from './TagButton.styled';

type ButtonProps = {
    clicked(): void;
    value: {
        name: string;
        id: string;
        color: string;
    };
};

const TagButton: React.FC<ButtonProps> = (props) => {
    const { clicked, value } = props;

    return (
        <Button color={value.color} onClick={clicked}>
            {value.name === '' ? 'None' : value.name}
        </Button>
    );
};

export default TagButton;
