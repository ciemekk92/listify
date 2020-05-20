import React from 'react';
import { NewList } from './AddNewList.styled';
import Plus from '../../../Icons/Plus';

const AddNewList = (props) => {
    return (
        <NewList onClick={props.clicked}>
            <Plus title={'Add new list'} color={'#fff'} size={30} />
        </NewList>
    );
};

export default AddNewList;
