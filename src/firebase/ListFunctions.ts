import { firestore } from './firebase';
import { Item } from '../types';
import firebase from 'firebase/app';
import { alertError, updateObject } from '../shared/utility';

export const completeItem = async (
    id: string,
    updateCb: Function,
    props: {
        list: string;
        tagName: string;
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
    const itemToRemove = props.lists[props.list].listItems.notCompleted.filter(
        (item: Item) => item.id === id
    );

    let tagKey = `tags.${props.tagName}.items`;

    try {
        await docRef.update({
            [`lists.${props.list}.listItems.notCompleted`]: firebase.firestore.FieldValue.arrayRemove(
                itemToRemove[0]
            )
        });
        const updatedItem = updateObject(itemToRemove[0], {
            completed: true
        });

        if (props.tagName !== '') {
            await docRef
                .update({
                    [tagKey]: firebase.firestore.FieldValue.arrayRemove(
                        itemToRemove[0]
                    )
                })
                .catch((error) => {
                    alertError(error);
                });
        }

        if (props.selectedItem.id) {
            props.onSelectingItem(updatedItem);
        }
        await docRef
            .update({
                [`lists.${props.list}.listItems.completed`]: firebase.firestore.FieldValue.arrayUnion(
                    updatedItem
                )
            })
            .catch((error) => {
                alertError(error);
            })
            .then(() => updateCb())
            .catch((error) => {
                alertError(error);
            });

        if (props.tagName !== '') {
            await docRef
                .update({
                    [tagKey]: firebase.firestore.FieldValue.arrayUnion(
                        updatedItem
                    )
                })
                .catch((error) => {
                    alertError(error);
                })
                .then(() => updateCb())
                .catch((error) => {
                    alertError(error);
                });
        }
    } catch (error) {
        alertError(error);
    }
};

export const deleteItem = async (
    list: string,
    id: string,
    completed: boolean,
    tagName: string,
    props: {
        lists: any;
    }
) => {
    const uid: any = localStorage.getItem('currentUser');
    const docRef = await firestore.collection('users').doc(uid);
    const itemToRemove = completed
        ? props.lists[list].listItems.completed.filter(
              (item: Item) => item.id === id
          )
        : props.lists[list].listItems.notCompleted.filter(
              (item: Item) => item.id === id
          );
    const deleteKey = completed
        ? `lists.${list}.listItems.completed`
        : `lists.${list}.listItems.notCompleted`;
    let tagKey = `tags.${tagName}.items`;
    try {
        await docRef
            .update({
                [deleteKey]: firebase.firestore.FieldValue.arrayRemove(
                    itemToRemove[0]
                )
            })
            .catch((error) => {
                alertError(error);
            });
        if (tagName !== '') {
            await docRef
                .update({
                    [tagKey]: firebase.firestore.FieldValue.arrayRemove(
                        itemToRemove[0]
                    )
                })
                .catch((error) => {
                    alertError(error);
                });
        }
    } catch (error) {
        alertError(error);
    }
};

export const clearItemsTag = async (
    list: string,
    id: string,
    completed: boolean,
    props: {
        lists: any;
    }
) => {
    const uid: any = localStorage.getItem('currentUser');
    const docRef = await firestore.collection('users').doc(uid);

    const itemToRemove = completed
        ? props.lists[list].listItems.completed.filter(
              (item: Item) => item.id === id
          )
        : props.lists[list].listItems.notCompleted.filter(
              (item: Item) => item.id === id
          );
    const updatedObject = updateObject(itemToRemove[0], {
        tag: {
            name: '',
            id: '',
            color: '',
            items: []
        }
    });

    let key = `lists.${list}.listItems.${
        completed ? 'completed' : 'notCompleted'
    }`;

    try {
        await docRef
            .update({
                [key]: firebase.firestore.FieldValue.arrayRemove(
                    itemToRemove[0]
                )
            })
            .catch((error) => {
                alertError(error);
            });
        await docRef
            .update({
                [key]: firebase.firestore.FieldValue.arrayUnion(updatedObject)
            })
            .catch((error) => {
                alertError(error);
            });
    } catch (error) {
        alertError(error);
    }
};
