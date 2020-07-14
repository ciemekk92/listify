import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import firebase from 'firebase/app';
import { firestore } from '../../../firebase/firebase';
import {
    Wrapper,
    Input,
    Value,
    Container,
    Confirm,
    Placeholder,
    Warning
} from './Name.styled';
import { Label } from '../Shared.styled';
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
    const [warning, setWarning] = useState('');

    useEffect(() => {
        setItem(selectedItem);
    }, [selectedItem]);

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
        if (item.value === '') {
            setWarning('The name field must not be empty!');
        } else {
            saveEditedItem()
                .then((response) => {
                    setEditing(!editing);
                    onGettingUserInfo();
                })
                .then((response) => onSelectingItem(item));
        }
    };

    const editHandler = () => {
        setEditing(!editing);
        setItem(selectedItem);
    };

    const emptyName = <Placeholder />;

    return (
        <Wrapper>
            <Label>Task name</Label>
            <EditButton
                title={'Edit task name'}
                clicked={editHandler}
                type="edit"
                size={16}
            />
            <CSSTransition
                in={!editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
                unmountOnExit
            >
                {editing ? emptyName : <Value>{selectedItem.value}</Value>}
            </CSSTransition>
            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
                unmountOnExit
            >
                <Container>
                    <Warning>{warning !== '' ? warning : null}</Warning>
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
                    <Confirm>
                        <EditButton
                            clicked={submitHandler}
                            title="Confirm changes"
                            type="confirm"
                            size={16}
                        />
                        <EditButton
                            clicked={() => setEditing(!editing)}
                            title="Cancel"
                            type="cancel"
                            size={16}
                        />
                    </Confirm>
                </Container>
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
