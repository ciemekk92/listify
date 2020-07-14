import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Item } from '../types';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: 'listify-react.firebaseapp.com',
    databaseURL: 'https://listify-react.firebaseio.com',
    projectId: 'listify-react',
    storageBucket: 'listify-react.appspot.com',
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const getUserDoc = async (uid: any) => {
    if (!uid) return null;
    try {
        const userDoc = await firestore.collection('users').doc(uid).get();
        return { uid, ...userDoc.data() };
    } catch (error) {
        alert(
            'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                error
        );
    }
};

export const createUserDoc = async (user: any, userName: string) => {
    const userRef = await firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { uid, email } = user;
        const createdAt = new Date();
        try {
            await userRef.set({
                uid,
                email,
                createdAt,
                userName: userName,
                lists: {}
            });
        } catch (error) {
            alert(
                'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                    error
            );
        }
    }
    return getUserDoc(user.uid);
};

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
            .catch((error) =>
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                )
            );
        await docRef
            .update({
                [editedItem.completed
                    ? keyCompleted
                    : keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                    editedItem
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
