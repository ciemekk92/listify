import React from 'react';
import { Wrapper } from './Description.styled'

const Description: React.FC = (props) => {
    return <Wrapper>{props.children}</Wrapper>;
};

export default Description;
