import React from 'react';
import { Input } from './NewListInput.styled';

const NewListInput = (props: {
    changed(event: React.ChangeEvent): void;
    submit(): void;
    value: string;
}) => {
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
