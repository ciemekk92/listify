import React from 'react';
import { Container } from './PanelContainer.styled';

const PanelContainer: React.FC = (props) => {
    return <Container>{props.children}</Container>;
};

export default PanelContainer;
