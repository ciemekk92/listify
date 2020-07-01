import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import firebase from 'firebase';
import { firestore } from '../../../firebase/firebase';
import { Input, Value, Confirm } from './Name.styled';
import { Wrapper, Label } from '../Shared.styled';
import EditButton from '../EditButton/EditButton';
import { CSSTransition } from 'react-transition-group';
import './Name.css';
import { updateObject } from '../../../shared/utility';
import { Item } from '../../../types';

type NameProps = {
    selectedItem: Item;
    currentList: any;
    onGettingUserInfo(): void;
    onSelectingItem(item: Item): void;
};

const Name: React.FC<NameProps> = (props) => {
    const {
        selectedItem,
        currentList,
        onGettingUserInfo,
        onSelectingItem
    } = props;
    const [editing, setEditing] = useState(false);
    const [item, setItem] = useState(selectedItem);

    useEffect(() => {
        setItem(selectedItem);
    }, [selectedItem]);

    // TODO correct input display
    // TODO empty input validation

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
                    [selectedItem.completed
                        ? keyCompleted
                        : keyNotCompleted]: firebase.firestore.FieldValue.arrayRemove(
                        selectedItem
                    )
                })
                .catch((error) => console.log(error));
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
        saveEditedItem()
            .then((response) => {
                setEditing(!editing);
                onGettingUserInfo();
            })
            .then((response) => onSelectingItem(item));
    };

    return (
        <Wrapper>
            <Label>Task name</Label>
            <Value>{selectedItem.value}</Value>
            <EditButton
                title={'Edit task name'}
                clicked={() => {
                    setEditing(!editing);
                }}
                type="edit"
            />
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
            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
                unmountOnExit
            >
                <Confirm>
                    <EditButton
                        clicked={submitHandler}
                        title="Confirm changes"
                        type="confirm"
                    />
                    <EditButton
                        clicked={() => setEditing(!editing)}
                        title="Cancel"
                        type="cancel"
                    />
                </Confirm>
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
    onGettingUserInfo: () => actions.initUserInfo(),
    onSelectingItem: (item: Item) => actions.setSelectedItem(item)
};

export default connect(mapStateToProps, mapDispatchToProps)(Name);
