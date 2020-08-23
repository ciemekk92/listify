import { firestore } from './firebase';
import { Item } from '../types';
import firebase from 'firebase';
import { updateObject } from '../shared/utility';

export const completeItem = async (
    id: string,
    updateCb: Function,
    props: {
        lists: any;
        currentList: string;
        keyNotCompleted: string;
        keyCompleted: string;
        selectedItem: Item;
        onSelectingItem(arg: Item): void;
    }
) => {
    const uid: any = localStorage.getItem('currentUser');
    const docRef = await firestore.collection('users').doc(uid);
    const itemToRemove = props.lists[
        props.currentList
    ].listItems.notCompleted.filter((item: Item) => item.id === id);
    try {
        await docRef.update({
            [props.keyNotCompleted]: firebase.firestore.FieldValue.arrayRemove(
                itemToRemove[0]
            )
        });
        const updatedItem = updateObject(itemToRemove[0], {
            completed: true
        });
        if (props.selectedItem.id) {
            props.onSelectingItem(updatedItem);
        }
        await docRef
            .update({
                [props.keyCompleted]: firebase.firestore.FieldValue.arrayUnion(
                    updatedItem
                )
            })
            .catch((error) =>
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                )
            )
            .then(() => updateCb())
            .catch((error) =>
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                )
            );
    } catch (error) {
        alert(
            'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                error
        );
    }
};

export const deleteItem = async (
    id: string,
    completed: boolean,
    props: {
        lists: any;
        currentList: string;
        keyCompleted: string;
        keyNotCompleted: string;
    }
) => {
    const uid: any = localStorage.getItem('currentUser');
    const docRef = await firestore.collection('users').doc(uid);
    const itemToRemove = completed
        ? props.lists[props.currentList].listItems.completed.filter(
              (item: Item) => item.id === id
          )
        : props.lists[props.currentList].listItems.notCompleted.filter(
              (item: Item) => item.id === id
          );
    const deleteKey = completed ? props.keyCompleted : props.keyNotCompleted;
    try {
        await docRef
            .update({
                [deleteKey]: firebase.firestore.FieldValue.arrayRemove(
                    itemToRemove[0]
                )
            })
            .catch((error) =>
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                )
            );
    } catch (error) {
        alert(
            'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                error
        );
    }
};
