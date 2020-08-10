import React from 'react';
import { NewList } from './AddNewList.styled';
import { Plus } from '../../../Icons';

const AddNewList = (props: { clicked(): void }) => {
    return (
        <NewList onClick={props.clicked}>
            <Plus
                title={'Add new list'}
                color={'#fff'}
                size={24}
                style={{ marginLeft: '3rem' }}
            />
            <p>Add new list</p>
        </NewList>
    );
};

export default AddNewList;
