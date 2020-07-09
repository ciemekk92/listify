import React, { useState } from 'react';
import { Name, Panel } from './NotePanel.styled';
import EditButton from '../../EditButton/EditButton';
import { CSSTransition } from 'react-transition-group';

type NotePanelProps = {
    clickedDelete(): void;
    value: string;
};

const NotePanel: React.FC<NotePanelProps> = (props) => {
    const [isShown, setIsShown] = useState(false);

    const { clickedDelete, value } = props;
    return (
        <Panel
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <Name>{value}</Name>
            <CSSTransition
                timeout={500}
                classNames="move"
                mountOnEnter
                unmountOnExit
                in={isShown}
            >
                <EditButton
                    title={'Delete note'}
                    type="delete"
                    clicked={clickedDelete}
                    size={20}
                />
            </CSSTransition>
        </Panel>
    );
};

export default NotePanel;
