import React from 'react';
import { Input } from './NewListInput.styled';

const NewListInput = (props: {
    changed(event: React.ChangeEvent): void;
    submit(): void;
    value: string;
    type: string;
}) => {
    const { changed, submit, type } = props;
    return (
        <Input
            onChange={changed}
            placeholder={type === 'list' ? 'New list name' : 'New tag name'}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    submit();
                }
            }}
            onSubmit={submit}
        />
    );
};

export default React.memo(NewListInput);
