import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Wrapper, Value, Confirm } from './DateContainer.styled';
import EditButton from '../EditButton/EditButton';
import DatePicker from '../../../containers/DatePicker/DatePicker';
import './DateContainer.css';

const DateContainer: React.FC<PropsFromRedux> = (props) => {
    const [editing, setEditing] = useState(false);

    const clickHandler = () => {
        setEditing(!editing);
    };

    //TODO finish saving new date to db
    const submitNewDateHandler = () => {};

    return (
        <Wrapper>
            <Value>{props.children}</Value>
            <EditButton
                clicked={clickHandler}
                title={'Edit date'}
                type={'edit'}
            />
            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'picker'}
                mountOnEnter
                unmountOnExit
            >
                <DatePicker type="details" />
            </CSSTransition>
            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'picker'}
                mountOnEnter
                unmountOnExit
            >
                <Confirm>
                    <EditButton
                        clicked={submitNewDateHandler}
                        title={'Submit new date'}
                        type={'confirm'}
                    />
                    <EditButton
                        clicked={() => setEditing(!editing)}
                        title={'Cancel'}
                        type={'cancel'}
                    />
                </Confirm>
            </CSSTransition>
        </Wrapper>
    );
};

const mapStateToProps = (state: { list: { changedDate: string } }) => {
    return {
        changedDate: state.list.changedDate
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(DateContainer));
