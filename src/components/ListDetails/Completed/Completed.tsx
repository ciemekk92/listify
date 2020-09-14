import React from 'react';
import { Wrapper } from './Completed.styled';
import * as actions from '../../../store/actions';
import { connect, ConnectedProps } from 'react-redux';
import { Item } from '../../../types';
import { firestore } from '../../../firebase/firebase';
import { alertError, updateObject } from '../../../shared/utility';
import firebase from 'firebase/app';
import CompletedButton from './CompletedButton/CompletedButton';

const Completed: React.FC<PropsFromRedux> = (props) => {
    const { selectedItem, lists, onGettingUserInfo, onSelectingItem } = props;

    const editHandler = async (
        id: string,
        completed: boolean,
        list: string
    ) => {
        const uid: any = localStorage.getItem('currentUser');
        let keyCompleted = `lists.${list}.listItems.completed`;
        let keyNotCompleted = `lists.${list}.listItems.notCompleted`;
        const docRef = await firestore.collection('users').doc(uid);
        const itemToRemove = lists[list].listItems[
            `${completed ? 'completed' : 'notCompleted'}`
        ].filter((item: Item) => item.id === id);

        const editedCompletion = updateObject(selectedItem, {
            completed: !selectedItem.completed
        });

        try {
            if (selectedItem.tag.name !== '') {
                await docRef
                    .update({
                        [`tags.${selectedItem.tag.name}.items`]: firebase.firestore.FieldValue.arrayRemove(
                            itemToRemove[0]
                        )
                    })
                    .catch((error) => alertError(error));

                await docRef
                    .update({
                        [`tags.${selectedItem.tag.name}.items`]: firebase.firestore.FieldValue.arrayUnion(
                            editedCompletion
                        )
                    })
                    .catch((error) => alertError(error));
            }

            await docRef
                .update({
                    [`${
                        completed ? keyCompleted : keyNotCompleted
                    }`]: firebase.firestore.FieldValue.arrayRemove(
                        itemToRemove[0]
                    )
                })
                .catch((error) => alertError(error));

            await docRef
                .update({
                    [`${
                        completed ? keyNotCompleted : keyCompleted
                    }`]: firebase.firestore.FieldValue.arrayUnion(
                        editedCompletion
                    )
                })
                .then(() => {
                    updateHandler(editedCompletion);
                })
                .catch((error) => {
                    alertError(error);
                });
        } catch (error) {
            alertError(error);
        }
    };

    const updateHandler = (item: Item) => {
        onGettingUserInfo();
        onSelectingItem(item);
    };

    return (
        <Wrapper>
            <CompletedButton
                clicked={() =>
                    editHandler(
                        selectedItem.id,
                        selectedItem.completed,
                        selectedItem.list
                    )
                }
                completed={selectedItem.completed}
            />
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: { selectedItem: Item };
    user: { userInfo: { lists: any } };
}) => {
    return {
        selectedItem: state.list.selectedItem,
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
