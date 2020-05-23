import React from 'react';
import { Panel } from './ListPanel.styled';

const ListPanel = (props) => {
    return (
        <Panel active={props.active} onClick={props.clicked}>
            {props.name}
        </Panel>
    );
};

export default ListPanel;
