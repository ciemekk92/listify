import React from 'react';
import { Button } from './EditButton.styled';
import Edit from '../../../components/Icons/Edit';

type ButtonProps = {
    clicked(): void;
    title: string;
};

const EditButton: React.FC<ButtonProps> = (props) => {
    const { clicked, title } = props;
    return (
        <Button onClick={clicked}>
            <Edit title={title} color={'#fff'} size={16} />
        </Button>
    );
};

export default EditButton;
