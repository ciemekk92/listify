import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../store/actions';
import { CSSTransition } from 'react-transition-group';
import './Notes.css';
import { Item } from '../../../types';
import { Wrapper, Input, Display, Confirm } from './Notes.styled';
import { Label } from '../Shared.styled';
import EditButton from '../EditButton/EditButton';
import { updateObject } from '../../../shared/utility';
import { saveEditedItem } from '../../../firebase/firebase';

const Notes: React.FC<PropsFromRedux> = (props) => {
    const {
        selectedItem,
        currentList,
        onGettingUserInfo,
        onSelectingItem
    } = props;

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // TODO notes styling, notes deleting

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        setInputValue(target.value);
    };

    const clearInput = () => {
        setInputValue('');
    };

    const submitHandler = () => {
        const updatedItem = updateObject(selectedItem, {
            notes: [inputValue, ...selectedItem.notes]
        });
        saveEditedItem(currentList, selectedItem, updatedItem)
            .then((response) => {
                setEditing(!editing);
                clearInput();
                onGettingUserInfo();
            })
            .then((response) => onSelectingItem(updatedItem));
    };

    const description =
        selectedItem.notes[0] !== '' ? (
            <Display>
                {selectedItem.notes.map((element) => (
                    <li>{element}</li>
                ))}
            </Display>
        ) : (
            <Display>No notes set yet! :(</Display>
        );

    const emptyDescription = <h1></h1>;

    return (
        <Wrapper>
            <Label>Notes</Label>
            <EditButton
                clicked={() => setEditing(!editing)}
                title={'Add new notes'}
                type={'edit'}
            />
            <CSSTransition
                in={!editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
            >
                {!editing ? description : emptyDescription}
            </CSSTransition>
            <CSSTransition
                in={editing}
                timeout={400}
                classNames={'input'}
                mountOnEnter
                unmountOnExit
            >
                <Input
                    editing={editing}
                    placeholder={
                        selectedItem.notes[0] === ''
                            ? 'Enter new notes here'
                            : selectedItem.notes[1]
                    }
                    onChange={inputChangedHandler}
                    onSubmit={submitHandler}
                    value={inputValue}
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

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Notes);
