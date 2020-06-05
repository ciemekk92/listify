import React from 'react';
import { Wrapper } from './Completed.styled';
import EditButton from '../EditButton/EditButton';
import * as actions from '../../../store/actions/index';
import { connect, ConnectedProps } from 'react-redux';
import { Item } from '../../../types/Item';
import { firestore } from '../../../firebase/firebase';
import { updateObject } from '../../../shared/utility';
import firebase from 'firebase';

const Completed: React.FC<PropsFromRedux> = (props) => {
    const {
        selectedItem,
        currentList,
        lists,
        onGettingUserInfo,
        onSelectingItem
    } = props;

    let keyCompleted = `lists.${currentList}.listItems.completed`;
    let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

    const editHandler = async (id: string, completed: boolean) => {
        const uid: any = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const itemToRemove = lists[currentList].listItems[
            `${completed ? 'completed' : 'notCompleted'}`
        ].filter((item: Item) => item.id === id);

        const editedCompletion = updateObject(selectedItem, {
            completed: !selectedItem.completed
        });

        try {
            await docRef.update({
                [`${
                    completed ? keyCompleted : keyNotCompleted
                }`]: firebase.firestore.FieldValue.arrayRemove(itemToRemove[0])
            });
            await docRef
                .update({
                    [`${
                        completed ? keyNotCompleted : keyCompleted
                    }`]: firebase.firestore.FieldValue.arrayUnion(
                        editedCompletion
                    )
                })
                .then((response) => {
                    updateHandler(editedCompletion);
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const updateHandler = (item: Item) => {
        onGettingUserInfo();
        onSelectingItem(item);
    };

    return (
        <Wrapper>
            {props.children ? 'Completed' : 'Not completed'}
            <EditButton
                clicked={() =>
                    editHandler(selectedItem.id, selectedItem.completed)
                }
                title={'Toggle completion'}
            />
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: { selectedItem: Item; currentList: string };
    user: { userInfo: { lists: any } };
}) => {
    return {
        selectedItem: state.list.selectedItem,
        currentList: state.list.currentList,
        lists: state.user.userInfo.lists
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSelectingItem: (item: Item) => actions.setSelectedItem(item)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(Completed));
