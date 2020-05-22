import React, { useState } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/UI/Sidebar/Sidebar/Sidebar';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions';

const SidebarCont = (props) => {
    const [newList, setNewList] = useState({
        name: '',
        id: null,
        timestamp: null,
        listItems: []
    });

    const newListHandler = async (list) => {
        if (newList.name !== '') {
            const uid = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const listWithTimestamp = updateObject(list, {
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            let key = `lists.${list.name}`;
            const obj = {
                [key]: [list]
            };
            try {
                await docRef
                    .update({
                        [key]: listWithTimestamp
                    })
                    .then((response) => props.onGettingUserInfo())
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const inputChangedHandler = (event) => {
        const updatedData = updateObject(newList, {
            name: event.target.value,
            id: uuidv4()
        });
        setNewList(updatedData);
    };

    return (
        <Sidebar
            addNew={() => newListHandler(newList)}
            inputValue={newList.name}
            inputChanged={inputChangedHandler}
            inputSubmit={() => newListHandler(newList)}
        />
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingUserInfo: () => dispatch(actions.initUserInfo())
    };
};

export default connect(null, mapDispatchToProps)(React.memo(SidebarCont));
