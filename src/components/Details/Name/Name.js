import React from 'react';
import { Wrapper } from './Name.styled';

const Name = (props) => {
    return <Wrapper>{props.children}</Wrapper>;
};

export default Name;
