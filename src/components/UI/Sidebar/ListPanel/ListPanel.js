import React from 'react';
import { Panel } from './ListPanel.styled';

const ListPanel = (props) => {
    return <Panel>{props.name}</Panel>;
};

export default ListPanel;
