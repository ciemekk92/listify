import React from 'react';
import { Input } from './NewListInput.styled';

const NewListInput = (props) => {
    return (
        <Input
            label={'Add new list'}
            onChange={props.changed}
            placeholder={'New list name'}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    props.submit();
                }
            }}
        />
    );
};

export default NewListInput;
