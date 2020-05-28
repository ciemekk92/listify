import React, { FunctionComponent } from 'react';
import { Container } from './ListContainer.styled';

const ListContainer: FunctionComponent = (props) => {
    return <Container>{props.children}</Container>;
};

export default React.memo(ListContainer);
