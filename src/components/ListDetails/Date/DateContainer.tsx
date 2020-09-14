import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
    saveEditedItem,
    updateTaggedItem
} from '../../../firebase/ListFunctions';
import { alertError, updateObject } from '../../../shared/utility';
import { Wrapper, Confirm } from './DateContainer.styled';
import EditButton from '../EditButton/EditButton';
import DatePicker from '../../../containers/DatePicker/DatePicker';
import './DateContainer.css';
import { Item } from '../../../types';
import * as actions from '../../../store/actions';
import { CSSTransition } from 'react-transition-group';

const DateContainer: React.FC<Props> = (props) => {
    const {
        clickedCancel,
        editing,
        selectedItem,
        changedDate,
        onGettingUserInfo,
        onSettingSelectedItem
    } = props;

    const submitNewDateHandler = () => {
        const updatedItem = updateObject(selectedItem, {
            date: changedDate
        });
        saveEditedItem(selectedItem, updatedItem).then(() => {
            updateTaggedItem(selectedItem, { date: changedDate })
                .then(() => {
                    onGettingUserInfo();
                    onSettingSelectedItem(updatedItem);
                    clickedCancel();
                })
                .catch((error) => alertError(error));
        });
    };

    return (
        <CSSTransition
            in={editing}
            timeout={400}
            mountOnEnter
            unmountOnExit
            classNames="height"
        >
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
        </CSSTransition>
    );
};

const mapStateToProps = (state: {
    list: { changedDate: string; selectedItem: Item };
    user: { userInfo: { lists: { [name: string]: any } } };
}) => {
    return {
        changedDate: state.list.changedDate,
        selectedItem: state.list.selectedItem,
        lists: state.user.userInfo.lists
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
