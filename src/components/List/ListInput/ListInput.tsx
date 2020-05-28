import React, { useEffect } from 'react';
import { Input } from './ListInput.styled';

const ListInput = (props: {
    editing: boolean;
    changed(): void;
    value: string;
    submit(): void;
}) => {
    const ref = React.createRef<HTMLInputElement>();
    const node = ref.current;

    useEffect(() => {
        if (node) {
            node.focus();
        }
    }, [props.editing, ref]);

    return (
        <Input
            ref={ref}
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

export default React.memo(ListInput);
