import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../store/actions';
import {
    saveEditedItem,
    updateTaggedItem
} from '../../../firebase/ListFunctions';
import { Wrapper, Input, Confirm, Warning } from './Name.styled';
import EditButton from '../EditButton/EditButton';
import { updateObject } from '../../../shared/utility';
import { Item } from '../../../types';
import { CSSTransition } from 'react-transition-group';

type NameProps = {
    clickedCancel(): void;
    editing: boolean;
    selectedItem: Item;
    onGettingUserInfo(): void;
    onSelectingItem(item: Item): void;
};

const Name: React.FC<Props> = (props) => {
    const {
        clickedCancel,
        editing,
        selectedItem,
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
            saveEditedItem(selectedItem, item).then(() =>
                updateTaggedItem(selectedItem, { value: item.value })
                    .then(() => {
                        setWarning('');
                        clickedCancel();
                        onGettingUserInfo();
                    })
                    .then(() => onSelectingItem(item))
            );
        }
    };

    return (
        <CSSTransition
            in={editing}
            timeout={400}
            mountOnEnter
            unmountOnExit
            classNames="height"
        >
            <Wrapper>
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
        </CSSTransition>
    );
};

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
    };
}) => {
    return {
        selectedItem: state.list.selectedItem
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSelectingItem: (item: Item) => actions.setSelectedItem(item)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & NameProps;

export default connector(React.memo(Name));
