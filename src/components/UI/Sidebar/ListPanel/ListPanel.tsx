import React, { useState } from 'react';
import { Panel, Name } from './ListPanel.styled';
import EditButton from '../../../Details/EditButton/EditButton';
import { CSSTransition } from 'react-transition-group';

type PanelProps = {
    active: boolean;
    clicked(): void;
    name: string;
    clickedDelete(): void;
};

const ListPanel: React.FC<PanelProps> = (props) => {
    const { clickedDelete, clicked, active } = props;
    const [isShown, setIsShown] = useState(false);

    return (
        <Panel
            active={active}
            onClick={clicked}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <CSSTransition
                timeout={500}
                classNames="move"
                mountOnEnter
                unmountOnExit
                in={isShown}
            >
                <EditButton
                    title={'Delete list'}
                    type="delete"
                    clicked={clickedDelete}
                    size={16}
                />
            </CSSTransition>
            <Name>{props.name}</Name>
        </Panel>
    );
};

export default React.memo(ListPanel);
