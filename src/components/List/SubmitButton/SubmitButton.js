import React from 'react';
import { Button } from './SubmitButton.styled';
import PropTypes from 'prop-types';

const SubmitButton = (props) => {
    return <Button onClick={props.clicked}>{props.children}</Button>;
};

SubmitButton.propTypes = {
    children: PropTypes.string.isRequired
};

export default SubmitButton;
