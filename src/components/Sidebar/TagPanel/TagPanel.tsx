import React, { useState } from 'react';
import { Panel, Name, ButtonContainer, Color, Count } from './TagPanel.styled';
import EditButton from '../../ListDetails/EditButton/EditButton';
import { CSSTransition } from 'react-transition-group';
import { connect, ConnectedProps } from 'react-redux';

type PanelProps = {
    count: number;
    active: boolean;
    color: string;
    clicked(): void;
    name: string;
    mobileClicked(): void;
    clickedDelete(): void;
};

const TagPanel: React.FC<Props> = (props) => {
    const {
        active,
        color,
        count,
        clicked,
        clickedDelete,
        name,
        mobile,
        mobileClicked
    } = props;

    const [isShown, setIsShown] = useState(false);

    const mobileCurrentHandler = () => {
        clicked();
        mobileClicked();
    };

    return (
        <Panel
            onClick={clicked}
            active={active}
            color={color}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <Color color={color} />
            <Name>
                {name.length < 12 ? name : name.substring(0, 12) + '...'}
            </Name>
            <Count>{count >= 100 ? '99+' : count}</Count>
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
                            size={20}
                        />
                    ) : null}
                    <EditButton
                        title={'Delete tag'}
                        type="delete"
                        clicked={clickedDelete}
                        size={20}
                    />
                </ButtonContainer>
            </CSSTransition>
        </Panel>
    );
};

const mapStateToProps = (state: {
    user: {
        mobile: boolean;
    };
}) => {
    return {
        mobile: state.user.mobile
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & PanelProps;

export default connector(React.memo(TagPanel));
