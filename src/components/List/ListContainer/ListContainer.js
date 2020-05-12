import React from 'react';
import { Container } from './ListContainer.styled';

const ListContainer = (props) => {
    return <Container>{props.children}</Container>;
};

export default React.memo(ListContainer);
