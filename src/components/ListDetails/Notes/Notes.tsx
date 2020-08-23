import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../store/actions';
import { firestore, saveEditedItem } from '../../../firebase/firebase';
import { CSSTransition } from 'react-transition-group';
import './Notes.css';
import { Item } from '../../../types';
import {
    Wrapper,
    Input,
    Display,
    Container,
    Confirm,
    Warning
} from './Notes.styled';
import { Label } from '../Shared.styled';
import EditButton from '../EditButton/EditButton';
import NotePanel from './NotePanel/NotePanel';
import { updateObject } from '../../../shared/utility';
import firebase from 'firebase/app';

const Notes: React.FC<PropsFromRedux> = (props) => {
    const {
        selectedItem,
        currentList,
        onGettingUserInfo,
        onSelectingItem
    } = props;

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [warning, setWarning] = useState('');

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setInputValue(target.value);
    };

    const clearInput = () => {
        setInputValue('');
    };

    const submitHandler = () => {
        if (inputValue === '') {
            setWarning('This field must not be empty!');
        } else {
            const updatedItem = updateObject(selectedItem, {
                notes: [inputValue, ...selectedItem.notes]
            });
            saveEditedItem(currentList, selectedItem, updatedItem)
                .then(() => {
                    setEditing(!editing);
                    clearInput();
                    onGettingUserInfo();
                })
                .then(() => onSelectingItem(updatedItem));
        }
    };

    const deleteNote = async (note: string) => {
        const resultArray = selectedItem.notes.filter(
            (element) => element !== note
        );

        const updatedItem = updateObject(selectedItem, {
            notes: resultArray
        });

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
                    [updatedItem.completed
                        ? keyCompleted
                        : keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                        updatedItem
                    )
                })
                .then(() => onSelectingItem(updatedItem))
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

    const deleteNoteHandler = async (note: string) => {
        await deleteNote(note).then(() => onGettingUserInfo());
    };

    const notesMap =
        selectedItem.notes.length !== 0 ? (
            <Display>
                {selectedItem.notes.map((element) => (
                    <NotePanel
                        value={element}
                        clickedDelete={() => deleteNoteHandler(element)}
                        key={uuidv4()}
                    />
                ))}
            </Display>
        ) : (
            <Display>No notes saved yet!</Display>
        );

    const emptyNote = <p />;

    return (
        <Wrapper editing={editing}>
            <Label>Notes</Label>
            <EditButton
                clicked={() => setEditing(!editing)}
                title={'Add new notes'}
                type={'edit'}
                size={16}
            />
            <CSSTransition
                in={!editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
            >
                {!editing ? notesMap : emptyNote}
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
                        editing={editing}
                        placeholder={'Enter new note here'}
                        onChange={inputChangedHandler}
                        onSubmit={submitHandler}
                        value={inputValue}
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

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Notes);