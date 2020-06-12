import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const getUserDoc = async (uid) => {
    if (!uid) return null;
    try {
        const userDoc = await firestore.collection('users').doc(uid).get();
        return { uid, ...userDoc.data() };
    } catch (error) {
        console.log(error);
    }
};

export const createUserDoc = async (user, userName) => {
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
            console.log(error);
        }
    }
    return getUserDoc(user.uid);
};

export const saveEditedItem = async (currentList, selectedItem, editedItem) => {
    let keyCompleted = `lists.${currentList}.listItems.completed`;
    let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

    const uid = localStorage.getItem('currentUser');
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
            .catch((error) => console.log(error));
        await docRef
            .update({
                [editedItem.completed
                    ? keyCompleted
                    : keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                    editedItem
                )
            })
            .catch((error) => console.log(error));
    } catch (error) {
        console.log(error);
    }
};
