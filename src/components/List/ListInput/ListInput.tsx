import React, { useEffect, useRef } from 'react';
import { Input } from './ListInput.styled';

const ListInput = (props: {
    editing: boolean;
    changed(event: React.ChangeEvent): void;
    value: string;
    submit(): void;
    ref: React.Ref<HTMLInputElement>;
}) => {
    const ref = useRef<HTMLInputElement>(null);
    const node = ref.current;

    useEffect(() => {
        if (node) {
            node.focus();
        }
    }, [props.editing, ref, node]);

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
