import React from 'react';
import { Input } from './ListInput.styled';

const ListInput = (props) => {
    return (
        <Input
            label={'Add new list item'}
            onChange={props.changed}
            placeholder={'Type in the task you want to add to your list!'}
            value={props.value}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    props.submit();
                }
            }}
        />
    );
};

export default ListInput;
