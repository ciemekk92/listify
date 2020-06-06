import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import firebase from 'firebase';
import { firestore } from '../../../firebase/firebase';
import { Wrapper, Display, Input } from './Name.styled';
import { CSSTransition } from 'react-transition-group';
import './Name.css';
import { updateObject } from '../../../shared/utility';
import { Item } from '../../../types';

type NameProps = {
    selectedItem: Item;
    currentList: any;
    onGettingUserInfo(): void;
};

const Name: React.FC<NameProps> = (props) => {
    const { selectedItem, currentList, onGettingUserInfo } = props;
    const [editing, setEditing] = useState(false);
    const [item, setItem] = useState(selectedItem);

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(item, {
            value: target.value
        });
        setItem(updatedData);
    };

    let keyCompleted = `lists.${currentList}.listItems.completed`;
    let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

    const saveEditedItem = async () => {
        const uid: any = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        try {
            await docRef
                .update({
                    [item.completed
                        ? keyCompleted
                        : keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                        item
                    )
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = () => {
        saveEditedItem().then((response) => onGettingUserInfo());
    };

    return (
        <Wrapper>
            <Display>{selectedItem.value}</Display>
            <button
                onClick={() => {
                    setEditing(!editing);
                    // TODO
                }}
            >
                Toggle
            </button>

            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
                unmountOnExit
            >
                <Input
                    placeholder={item.value}
                    onChange={inputChangedHandler}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            submitHandler();
                        }
                    }}
                    onSubmit={submitHandler}
                    value={item.value}
                />
            </CSSTransition>
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
        currentList: any;
    };
}) => {
    return {
        selectedItem: state.list.selectedItem,
        currentList: state.list.currentList
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo()
};

export default connect(mapStateToProps, mapDispatchToProps)(Name);
