import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { saveEditedItem } from '../../../firebase/firebase';
import { updateObject } from '../../../shared/utility';
import { Value, Confirm } from './DateContainer.styled';
import { Wrapper, Label } from '../Shared.styled';
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
            .then((response) => {
                onGettingUserInfo();
                onSettingSelectedItem(updatedItem);
                setEditing(!editing);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Wrapper>
            <Label>Date</Label>
            <Value>{selectedItem.date}</Value>
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
