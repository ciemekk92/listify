import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../store/actions';
import { firestore, saveEditedItem } from '../../../firebase/firebase';
import '../Transitions.css';
import { Item } from '../../../types';
import {
    AddWrapper,
    Input,
    Display,
    Confirm,
    Warning,
    Wrapper,
    Placeholder
} from './Notes.styled';
import EditButton from '../EditButton/EditButton';
import NotePanel from './NotePanel/NotePanel';
import { alertError, updateObject } from '../../../shared/utility';
import firebase from 'firebase/app';
import { CSSTransition } from 'react-transition-group';

const Notes: React.FC<Props> = (props) => {
    const {
        editing,
        clickedCancel,
        selectedItem,
        currentList,
        onGettingUserInfo,
        onSelectingItem
    } = props;

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
                    // setEditing(!editing);
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
                .catch((error) => {
                    alertError(error);
                });
            await docRef
                .update({
                    [updatedItem.completed
                        ? keyCompleted
                        : keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                        updatedItem
                    )
                })
                .then(() => onSelectingItem(updatedItem))
                .catch((error) => {
                    alertError(error);
                });
        } catch (error) {
            alertError(error);
        }
    };

    const deleteNoteHandler = async (note: string) => {
        await deleteNote(note).then(() => onGettingUserInfo());
    };

    const notesMap = (
        <Display>
            {selectedItem.notes.map((element) => (
                <NotePanel
                    value={element}
                    clickedDelete={() => deleteNoteHandler(element)}
                    key={uuidv4()}
                />
            ))}
        </Display>
    );

    return (
        <Wrapper>
            <CSSTransition
                in={editing}
                timeout={400}
                mountOnEnter
                unmountOnExit
                classNames="height"
            >
                <AddWrapper>
                    <Warning>{warning !== '' ? warning : null}</Warning>
                    <Input
                        placeholder={'Enter new note here'}
                        onChange={inputChangedHandler}
                        onSubmit={submitHandler}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                submitHandler();
                            }
                        }}
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
                            clicked={() => clickedCancel()}
                            title="Cancel"
                            type="cancel"
                            size={16}
                        />
                    </Confirm>
                </AddWrapper>
            </CSSTransition>
            {selectedItem.notes.length > 0 ? (
                notesMap
            ) : (
                <Placeholder>No notes saved yet for this task!</Placeholder>
            )}
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
type Props = PropsFromRedux & { editing: boolean; clickedCancel(): void };

export default connector(Notes);
