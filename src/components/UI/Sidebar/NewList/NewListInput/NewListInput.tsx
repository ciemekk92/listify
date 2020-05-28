import React from 'react';
import { Input } from './NewListInput.styled';

const NewListInput = (props: { changed(): void; submit(): void }) => {
    return (
        <Input
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
