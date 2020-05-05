import React from 'react';
import { Button } from './ListButton.styled';
import PropTypes from 'prop-types';

const ListButton = (props) => {
    return <Button onClick={props.clicked}>{props.children}</Button>;
};

ListButton.propTypes = {
    children: PropTypes.string.isRequired
};

export default ListButton;
