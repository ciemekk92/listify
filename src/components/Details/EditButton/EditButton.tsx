import React from 'react';
import { Button } from './EditButton.styled';
import { Cancel, Confirm, Edit, Delete } from '../../Icons';

type ButtonProps = {
    clicked(): void;
    title: string;
    type: string;
};

const EditButton: React.FC<ButtonProps> = (props) => {
    const { clicked, title, type } = props;

    const editButton = <Edit title={title} color={'#fff'} size={16} />;
    const confirmButton = <Confirm title={title} color={'#fff'} size={16} />;
    const cancelButton = <Cancel title={title} color={'#fff'} size={16} />;
    const deleteButton = <Delete title={title} color={'#fff'} size={16} />;

    return (
        <Button onClick={clicked}>
            {type === 'edit'
                ? editButton
                : type === 'confirm'
                ? confirmButton
                : type === 'delete'
                ? deleteButton
                : cancelButton}
        </Button>
    );
};

export default EditButton;
