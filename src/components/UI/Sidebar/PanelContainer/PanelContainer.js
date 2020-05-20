import React from 'react';
import { Container } from './PanelContainer.styled';

const PanelContainer = (props) => {
    return <Container>{props.children}</Container>;
};

export default PanelContainer;
