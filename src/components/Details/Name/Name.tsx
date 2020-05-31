import React, { FunctionComponent } from 'react';
import { Wrapper } from './Name.styled';

const Name: FunctionComponent = (props) => {
    return <Wrapper>{props.children}</Wrapper>;
};

export default Name;
