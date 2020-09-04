import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { saveEditedItem } from '../../../firebase/firebase';
import { Wrapper, Input, Confirm, Warning } from './Name.styled';
import EditButton from '../EditButton/EditButton';
import './Name.css';
import { updateObject } from '../../../shared/utility';
import { Item } from '../../../types';

type NameProps = {
    clickedCancel(): void;
    editing: boolean;
    selectedItem: Item;
    currentList: any;
    onGettingUserInfo(): void;
    onSelectingItem(item: Item): void;
};

const Name: React.FC<NameProps> = (props) => {
    const {
        clickedCancel,
        editing,
        selectedItem,
        currentList,
        onGettingUserInfo,
        onSelectingItem
    } = props;

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

    const submitHandler = () => {
        if (item.value === '') {
            setWarning('The name field must not be empty!');
        } else {
            saveEditedItem(currentList, selectedItem, item)
                .then(() => {
                    setWarning('');
                    clickedCancel();
                    onGettingUserInfo();
                })
                .then(() => onSelectingItem(item));
        }
    };

    return (
        <Wrapper editing={editing}>
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
                    clicked={() => {
                        clickedCancel();
                    }}
                    title="Cancel"
                    type="cancel"
                    size={16}
                />
            </Confirm>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Name));
