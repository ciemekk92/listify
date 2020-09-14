import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { alertError } from '../shared/utility';

// Edit firebaseConfig with your Firebase configuration, if you cloned the repository from GitHub
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
        alertError(error);
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
                lists: {},
                tags: []
            });
        } catch (error) {
            alertError(error);
        }
    }
    return getUserDoc(user.uid);
};
