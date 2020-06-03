import React, { useState } from 'react';
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
    const [completed, setCompleted] = useState(props.children);

    let key = `lists.${currentList}.listItems`;

    const editHandler = async (id: string) => {
        const uid: any = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const itemToRemove = lists[currentList].listItems.filter(
            (item: Item) => item.id === id
        );
        try {
            await docRef.update({
                [key]: firebase.firestore.FieldValue.arrayRemove(
                    itemToRemove[0]
                )
            });
            const editedCompletion = updateObject(selectedItem, {
                completed: !completed
            });
            setCompleted(!completed);
            await docRef
                .update({
                    [key]: firebase.firestore.FieldValue.arrayUnion(
                        editedCompletion
                    )
                })
                .catch((error) => console.log(error))
                .then((response) => updateHandler(editedCompletion))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    // TODO fix not always changing completed/not completed

    const updateHandler = (item: Item) => {
        onGettingUserInfo();
        onSelectingItem(item);
    };

    return (
        <Wrapper>
            {props.children ? 'Completed' : 'Not completed'}
            <EditButton
                clicked={() => editHandler(selectedItem.id)}
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
