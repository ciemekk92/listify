import React from 'react';
import { TextInput } from './LoginInput.styled';
import { capitalizeFirstLetter } from '../../../shared/utility';

const LoginInput = (props: {
    name: string;
    changed(): void;
    type: string;
    value: string;
}) => {
    return (
        <TextInput
            name={props.name}
            onChange={props.changed}
            placeholder={`${capitalizeFirstLetter(props.type)}`}
            value={props.value}
            type={props.type}
        />
    );
};

export default LoginInput;
