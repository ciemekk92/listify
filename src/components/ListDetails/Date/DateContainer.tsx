import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { saveEditedItem } from '../../../firebase/firebase';
import { updateObject } from '../../../shared/utility';
import { Value, Confirm, Container, Placeholder } from './DateContainer.styled';
import { Wrapper } from '../Shared.styled';
import EditButton from '../EditButton/EditButton';
import DatePicker from '../../../containers/DatePicker/DatePicker';
import './DateContainer.css';
import { Item } from '../../../types';
import * as actions from '../../../store/actions';

const DateContainer: React.FC<Props> = (props) => {
    const [editing, setEditing] = useState(false);
    const {
        selectedItem,
        changedDate,
        currentList,
        onGettingUserInfo,
        onSettingSelectedItem
    } = props;

    const clickHandler = () => {
        setEditing(!editing);
    };

    const submitNewDateHandler = () => {
        const updatedItem = updateObject(selectedItem, {
            date: changedDate
        });
        saveEditedItem(currentList, selectedItem, updatedItem)
            .then(() => {
                onGettingUserInfo();
                onSettingSelectedItem(updatedItem);
                setEditing(!editing);
            })
            .catch((error) =>
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                )
            );
    };

    const emptyDate = <Placeholder />;

    return (
        <Wrapper>
            <EditButton
                clicked={clickHandler}
                title={'Edit date'}
                type={'edit'}
                size={16}
            />
            <CSSTransition
                in={!editing}
                timeout={400}
                classNames={'picker'}
                mountOnEnter
                unmountOnExit
            >
                {editing ? emptyDate : <Value>{selectedItem.date}</Value>}
            </CSSTransition>
            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'picker'}
                mountOnEnter
                unmountOnExit
            >
                <Container>
                    <DatePicker type="details" />
                    <Confirm>
                        <EditButton
                            clicked={submitNewDateHandler}
                            title={'Submit new date'}
                            type={'confirm'}
                            size={16}
                        />
                        <EditButton
                            clicked={() => setEditing(!editing)}
                            title={'Cancel'}
                            type={'cancel'}
                            size={16}
                        />
                    </Confirm>
                </Container>
            </CSSTransition>
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: { currentList: string; changedDate: string; selectedItem: Item };
}) => {
    return {
        currentList: state.list.currentList,
        changedDate: state.list.changedDate,
        selectedItem: state.list.selectedItem
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSettingSelectedItem: (item: Item) => actions.setSelectedItem(item)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    selectedItem: Item;
    changedDate: string;
    currentList: string;
};

export default connector(React.memo(DateContainer));
