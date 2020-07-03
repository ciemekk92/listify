import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../store/actions';
import { CSSTransition } from 'react-transition-group';
import './Description.css';
import { Item } from '../../../types';
import { Wrapper, Input, Display, Confirm } from './Description.styled';
import { Label } from '../Shared.styled';
import EditButton from '../EditButton/EditButton';
import { updateObject } from '../../../shared/utility';
import { saveEditedItem } from '../../../firebase/firebase';

const Description: React.FC<PropsFromRedux> = (props) => {
    const {
        selectedItem,
        currentList,
        onGettingUserInfo,
        onSelectingItem
    } = props;
    const description =
        selectedItem.description !== '' ? (
            <Display>{selectedItem.description}</Display>
        ) : (
            <Display>No notes set yet! :(</Display>
        );

    const [editing, setEditing] = useState(false);
    const [item, setItem] = useState(selectedItem);

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(item, {
            description: target.value
        });
        setItem(updatedData);
    };

    const submitHandler = () => {
        saveEditedItem(currentList, selectedItem, item)
            .then((response) => {
                setEditing(!editing);
                onGettingUserInfo();
            })
            .then((response) => onSelectingItem(item));
    };

    const emptyDescription = <h1></h1>;

    // FIXME fix transitions on input
    return (
        <Wrapper>
            <Label>Notes</Label>
            <EditButton
                clicked={() => setEditing(!editing)}
                title={'Edit description'}
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
                        item.description === ''
                            ? 'Enter new notes here'
                            : item.description
                    }
                    onChange={inputChangedHandler}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            submitHandler();
                        }
                    }}
                    onSubmit={submitHandler}
                    value={item.description}
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

export default connector(Description);
