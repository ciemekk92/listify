import React from 'react';
import { NewList } from './AddNewList.styled';
import { Plus } from '../../../Icons';

// TODO Rework this

const AddNewList = (props: { clicked(): void }) => {
    return (
        <NewList onClick={props.clicked}>
            <Plus title={'Add new list'} color={'#fff'} size={30} />
        </NewList>
    );
};

export default AddNewList;
