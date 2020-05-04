import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './LoginButton.styled';

const LoginButton = (props) => {
    return (
        <StyledButton onClick={props.clicked} login={props.login}>
            {props.children}
        </StyledButton>
    );
};

LoginButton.propTypes = {
    children: PropTypes.string.isRequired
};

export default LoginButton;
