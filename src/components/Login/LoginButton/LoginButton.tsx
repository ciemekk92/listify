import React from 'react';
import { Button } from './LoginButton.styled';

type ButtonProps = {
    clicked(): void;
    login: boolean;
};

const LoginButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button onClick={props.clicked} login={props.login}>
            {props.children}
        </Button>
    );
};

export default LoginButton;
