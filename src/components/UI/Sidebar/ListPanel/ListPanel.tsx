import React from 'react';
import { Panel } from './ListPanel.styled';

type PanelProps = {
    active: boolean;
    clicked(): void;
    name: string;
};

const ListPanel: React.FC<PanelProps> = (props) => {
    return (
        <Panel active={props.active} onClick={props.clicked}>
            {props.name}
        </Panel>
    );
};

export default ListPanel;
