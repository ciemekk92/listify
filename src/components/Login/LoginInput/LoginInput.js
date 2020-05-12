import React from 'react';
import { TextInput } from './LoginInput.styled';
import { capitalizeFirstLetter } from '../../../shared/utility';

const LoginInput = (props) => {
    return (
        <TextInput
            name={props.name}
            label={`${props.type}`}
            onChange={props.changed}
            placeholder={`${capitalizeFirstLetter(props.type)}`}
            value={props.value}
            type={props.type}
        />
    );
};

export default LoginInput;
