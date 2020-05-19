import React from 'react';
import { NewList } from './AddNewList.styled';
import { ReactComponent as Plus } from '../../../../assets/add-outline.svg';

const AddNewList = (props) => {
    return (
        <NewList>
            <Plus title={'Add new list'} style={{ width: '30px' }} />
        </NewList>
    );
};

export default AddNewList;
