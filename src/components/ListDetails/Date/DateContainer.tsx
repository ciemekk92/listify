import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { saveEditedItem } from '../../../firebase/firebase';
import { updateObject } from '../../../shared/utility';
import { Wrapper, Confirm } from './DateContainer.styled';
import EditButton from '../EditButton/EditButton';
import DatePicker from '../../../containers/DatePicker/DatePicker';
import './DateContainer.css';
import { Item } from '../../../types';
import * as actions from '../../../store/actions';

const DateContainer: React.FC<Props> = (props) => {
    const {
        clickedCancel,
        editing,
        selectedItem,
        changedDate,
        currentList,
        onGettingUserInfo,
        onSettingSelectedItem
    } = props;

    const clickHandler = () => {};

    // Fix view

    const submitNewDateHandler = () => {
        const updatedItem = updateObject(selectedItem, {
            date: changedDate
        });
        saveEditedItem(currentList, selectedItem, updatedItem)
            .then(() => {
                onGettingUserInfo();
                onSettingSelectedItem(updatedItem);
                // setEditing(!editing);
            })
            .catch((error) =>
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                )
            );
    };

    // TODO: fix positioning

    return (
        <Wrapper editing={editing}>
            <DatePicker type="details" />
            <Confirm>
                <EditButton
                    clicked={submitNewDateHandler}
                    title={'Submit new date'}
                    type={'confirm'}
                    size={16}
                />
                <EditButton
                    clicked={() => clickedCancel()}
                    title={'Cancel'}
                    type={'cancel'}
                    size={16}
                />
            </Confirm>
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
    editing: boolean;
    clickedCancel(): void;
};

export default connector(React.memo(DateContainer));
