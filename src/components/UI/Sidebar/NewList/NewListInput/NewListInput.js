import React from 'react';
import { Input, Wrapper } from './NewListInput.styled';

const NewListInput = (props) => {
    return (
        <Wrapper>
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
        </Wrapper>
    );
};

export default NewListInput;
