import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './LoginButton.styled';

const LoginButton = (props) => {
    return (
        <Button onClick={props.clicked} login={props.login}>
            {props.children}
        </Button>
    );
};

LoginButton.propTypes = {
    children: PropTypes.string.isRequired
};

export default LoginButton;
