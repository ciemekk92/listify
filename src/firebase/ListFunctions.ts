import { firestore } from './firebase';
import { Item } from '../types';
import firebase from 'firebase/app';
import { alertError, updateObject } from '../shared/utility';

export const saveEditedItem = async (
    currentList: string,
    selectedItem: Item,
    editedItem: Item
) => {
    let keyCompleted = `lists.${currentList}.listItems.completed`;
    let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

    const uid: any = localStorage.getItem('currentUser');
    const docRef = await firestore.collection('users').doc(uid);

    try {
        await docRef
            .update({
                [selectedItem.completed
                    ? keyCompleted
                    : keyNotCompleted]: firebase.firestore.FieldValue.arrayRemove(
                    selectedItem
                )
            })
            .catch((error) => {
                alertError(error);
            });
        await docRef
            .update({
                [editedItem.completed
                    ? keyCompleted
                    : keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                    editedItem
                )
            })
            .catch((error) => {
                alertError(error);
            });
    } catch (error) {
        alertError(error);
    }
};

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

const findItemToRemove = (
    lists: any,
    list: string,
    comparedItem: { completed: boolean; id: string }
) => {
    return comparedItem.completed
        ? lists[list].listItems.completed.filter(
              (item: Item) => item.id === comparedItem.id
          )
        : lists[list].listItems.notCompleted.filter(
              (item: Item) => item.id === comparedItem.id
          );
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
    const itemToRemove = findItemToRemove(props.lists, list, {
        completed: completed,
        id: id
    });

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

export const updateTaggedItem = async (
    oldItem: Item,
    props: {
        lists: any;
    },
    updatedProps: {
        [name: string]: any;
    }
) => {
    const uid: any = localStorage.getItem('currentUser');
    const docRef = await firestore.collection('users').doc(uid);
    const returnKey = (tagName: string) => `tags.${tagName}.items`;

    const updatedItem = updateObject(oldItem, { ...updatedProps });

    try {
        if (oldItem.tag.name !== '') {
            await docRef
                .update({
                    [returnKey(
                        oldItem.tag.name
                    )]: firebase.firestore.FieldValue.arrayRemove(oldItem)
                })
                .catch((error) => alertError(error));
        }

        if (updatedItem.tag.name !== '') {
            await docRef
                .update({
                    [returnKey(
                        updatedItem.tag.name
                    )]: firebase.firestore.FieldValue.arrayUnion(updatedItem)
                })
                .catch((error) => alertError(error));
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

    const itemToRemove = findItemToRemove(props.lists, list, {
        completed: completed,
        id: id
    });

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
