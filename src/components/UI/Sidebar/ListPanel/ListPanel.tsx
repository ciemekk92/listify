import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Panel, Name, ButtonContainer } from './ListPanel.styled';
import EditButton from '../../../Details/EditButton/EditButton';
import { CSSTransition } from 'react-transition-group';
import * as actions from '../../../../store/actions';

type PanelProps = {
    active: boolean;
    clicked(): void;
    name: string;
    clickedDelete(): void;
};

type Props = PanelProps & PropsFromRedux;

const ListPanel: React.FC<Props> = (props) => {
    const {
        name,
        clickedDelete,
        clicked,
        active,
        mobile,
        onSettingCurrentList
    } = props;
    const [isShown, setIsShown] = useState(false);

    const mobileHandler = () => {
        setIsShown(true);
    };

    const mobileCurrentHandler = () => {
        onSettingCurrentList(name);
    };

    return (
        <Panel
            active={active}
            onClick={mobile ? mobileHandler : clicked}
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
                <ButtonContainer>
                    {mobile ? (
                        <EditButton
                            title={'Select active list'}
                            type="confirm"
                            clicked={mobileCurrentHandler}
                            size={16}
                        />
                    ) : null}
                    <EditButton
                        title={'Delete list'}
                        type="delete"
                        clicked={clickedDelete}
                        size={16}
                    />
                </ButtonContainer>
            </CSSTransition>
            <Name>{name}</Name>
        </Panel>
    );
};

const mapStateToProps = (state: {
    list: {
        currentList: string;
    };
    user: {
        mobile: boolean;
    };
}) => {
    return {
        currentList: state.list.currentList,
        mobile: state.user.mobile
    };
};

const mapDispatchToProps = {
    onSettingCurrentList: (list: string) => actions.setCurrentList(list)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(ListPanel));
