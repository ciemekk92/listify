import React, { useEffect } from 'react';
import { Input } from './ListInput.styled';

const ListInput = (props) => {
    const ref = React.createRef();

    useEffect(() => {
        ref.current.focus();
    }, [props.editing, ref]);

    return (
        <Input
            ref={ref}
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

export default React.memo(ListInput);
