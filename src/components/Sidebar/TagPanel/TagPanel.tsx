import React from 'react';
import { Panel, Name, Count, ButtonContainer } from './TagPanel.styled';
import EditButton from '../../ListDetails/EditButton/EditButton';

type PanelProps = {
    active: boolean;
    color: string;
    clicked(): void;
};

const TagPanel: React.FC<PanelProps> = (props) => {
    const { active, color, clicked } = props;

    const clickedDelete = () => {};

    return (
        <Panel onClick={clicked} active={active} color={color}>
            <Name>{props.children}</Name>
            <Count>0</Count>
            <ButtonContainer>
                <EditButton
                    title={'Delete tag'}
                    type="delete"
                    clicked={clickedDelete}
                    size={20}
                />
            </ButtonContainer>
        </Panel>
    );
};

export default TagPanel;
