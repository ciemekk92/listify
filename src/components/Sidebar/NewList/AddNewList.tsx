import React from 'react';
import { NewList } from './AddNewList.styled';
import { Plus } from '../../Icons';

const AddNewList = (props: { clicked(): void; type: string }) => {
    const { clicked, type } = props;
    return (
        <NewList onClick={clicked}>
            <Plus
                title={'Add new list'}
                color={'#fff'}
                size={24}
                style={{ marginLeft: '1.6rem' }}
            />
            <p>Add new {type}</p>
        </NewList>
    );
};

export default AddNewList;
