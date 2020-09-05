import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions';
import Sidebar from '../../containers/Sidebar/Sidebar';
import ListLayout from '../../containers/ListLayout/ListLayout';
import ListDetails from '../../containers/ListDetails/ListDetails';
import TagLayout from '../../containers/TagLayout/TagLayout';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Item, Tag } from '../../types';
import {
    AddingRow,
    ListWrapper,
    Placeholder,
    PlaceholderList,
    Row,
    Wrapper
} from './List.styled';
import './List.css';
import '../../containers/ListLayout/ListLayout.css';
import Burger from '../../components/Sidebar/Burger/Burger';
import { Heading2 } from '../../components/UI/Typography/Headings/Headings.styled';
import {
    AddingTaskContainer,
    AddingTaskToggle,
    Description,
    Warning
} from '../../containers/ListLayout/ListLayout.styled';
import {
    FieldContainer,
    Field
} from '../../components/UI/TagSelector/TagSelector.styled';
import { Plus } from '../../components/Icons';
import { CSSTransition } from 'react-transition-group';
import ListInput from '../../components/ListLayout/ListInput/ListInput';
import DatePicker from '../../containers/DatePicker/DatePicker';
import SubmitButton from '../../components/ListLayout/SubmitButton/SubmitButton';
import { alertError, updateObject } from '../../shared/utility';
import { firestore } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import FieldButton from '../../components/ListLayout/FieldButton/FieldButton';
import TagSelector from '../../components/UI/TagSelector/TagSelector';

const { Provider } = hiddenListContext;

const List: React.FC<PropsFromRedux> = (props) => {
    const {
        date,
        lists,
        tags,
        selectedItem,
        mobile,
        onGettingUserInfo,
        onSettingMobile,
        currentList,
        currentTag
    } = props;

    const initialItem = {
        value: '',
        id: '',
        date: new Date(),
        completed: false,
        notes: [],
        tag: {
            name: '',
            id: '',
            color: ''
        },
        list: ''
    };

    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputItem, setInputItem] = useState(initialItem);
    const [warning, setWarning] = useState('');
    const [editing, setEditing] = useState(false);
    const [addingTask, setAddingTask] = useState(false);
    const [showTags, setShowTags] = useState(false);
    const [showLists, setShowLists] = useState(false);
    const [buttonTag, setButtonTag] = useState({
        name: '',
        id: '',
        color: ''
    });
    const [buttonList, setButtonList] = useState('');

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(inputItem, {
            value: target.value
        });
        setInputItem(updatedData);
        setEditing(true);
    };

    const clearInput = () => {
        // Updating without changing earlier selected list and tag
        const clearedItem = updateObject(inputItem, {
            value: '',
            id: '',
            date: new Date(),
            completed: false,
            notes: []
        });
        setInputItem(clearedItem);
    };

    const listUpdateHandler = () => {
        onGettingUserInfo();
        clearInput();
        setEditing(false);
    };

    const handleClick = (value: boolean) => {
        setHidden(value);
    };

    const openHandler = () => {
        setOpen(!open);
    };

    const updateMedia = () => {
        onSettingMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => {
            window.removeEventListener('resize', updateMedia);
        };
    });

    const updateList = () => {
        const updatedItem = updateObject(inputItem, {
            list: currentList
        });
        setInputItem(updatedItem);
    };

    useEffect(() => {
        if (currentList) {
            setButtonList(currentList);
            updateList();
        }
        // eslint-disable-next-line
    }, [currentList]);

    const submitHandler = () => {
        if (inputItem.value === '') {
            setWarning('Name field must not be empty!');
        } else {
            saveNewItem(inputItem).then(() => listUpdateHandler());
        }
    };

    const listDisplayHandler = () => {
        setShowLists(!showLists);
    };

    const tagDisplayHandler = () => {
        setShowTags(!showTags);
    };

    const tagSelectHandler = (tag: {
        name: string;
        id: string;
        color: string;
    }) => {
        const updatedItem = updateObject(inputItem, {
            tag: tag
        });
        setInputItem(updatedItem);
        setButtonTag(tag);
        setShowTags(!showTags);
    };

    const listSelectHandler = (list: string) => {
        const updatedItem = updateObject(inputItem, {
            list: list
        });
        setInputItem(updatedItem);
        setButtonList(list);
        setShowLists(!showLists);
    };

    const toggleAddingTask = () => {
        setAddingTask(!addingTask);
    };

    const saveNewItem = async (newItem: Item) => {
        const uid: any = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const newItemWithDate = updateObject(newItem, {
            date: date,
            id: uuidv4()
        });

        let keyNotCompleted = `lists.${newItem.list}.listItems.notCompleted`;
        let keyWithTag = `tags.${newItem.tag?.name}.items`;

        try {
            await docRef
                .update({
                    [keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                        newItemWithDate
                    )
                })
                .catch((error) => {
                    alertError(error);
                });
            if (newItem.tag.name !== '') {
                await docRef
                    .update({
                        [keyWithTag]: firebase.firestore.FieldValue.arrayUnion(
                            newItemWithDate
                        )
                    })
                    .catch((error) => {
                        alertError(error);
                    });
            }
        } catch (error) {
            alertError(error);
        }
    };

    const [showPlaceholder, setShowPlaceholder] = useState(false);

    useEffect(() => {
        if (!selectedItem.id) {
            setTimeout(() => setShowPlaceholder(true), 400);
        } else {
            setShowPlaceholder(false);
        }
    }, [selectedItem.id]);

    let tagsArray = Object.values(tags);
    let listsArray = Object.keys(lists).sort();

    return (
        <Provider value={{ hidden, handleClick }}>
            {mobile ? <Burger open={open} setOpen={openHandler} /> : null}
            <Sidebar open={open} setOpen={openHandler} />
            <Wrapper>
                <ListWrapper>
                    <Row>
                        {currentList || currentTag.id !== '' ? (
                            <Heading2
                                color={
                                    currentTag.id !== '' ? currentTag.color : ''
                                }
                            >
                                Your tasks -{' '}
                                {currentList
                                    ? currentList
                                    : currentTag.id !== ''
                                    ? currentTag.name
                                    : null}
                            </Heading2>
                        ) : null}
                        {currentList || currentTag.id !== '' ? (
                            <AddingTaskToggle onClick={toggleAddingTask}>
                                <Plus
                                    size={32}
                                    title={'Add new task'}
                                    color={'#fff'}
                                />
                            </AddingTaskToggle>
                        ) : null}
                    </Row>
                    <Row noMargin>
                        {currentList || currentTag.id !== '' ? (
                            <CSSTransition
                                in={addingTask}
                                timeout={400}
                                mountOnEnter
                                unmountOnExit
                                classNames="container-height"
                            >
                                <AddingTaskContainer adding={addingTask}>
                                    <AddingRow>
                                        <Description>Task name:</Description>
                                        <ListInput
                                            submit={() => submitHandler()}
                                            changed={inputChangedHandler}
                                            value={inputItem.value}
                                            editing={editing}
                                        />
                                    </AddingRow>
                                    <AddingRow>
                                        <Description>Date:</Description>
                                        <DatePicker type="layout" />
                                    </AddingRow>
                                    <AddingRow>
                                        <Description>List:</Description>
                                        <FieldButton
                                            clicked={listDisplayHandler}
                                            listValue={buttonList}
                                            listEnabled
                                        />
                                    </AddingRow>
                                    <AddingRow active={!showLists}>
                                        <CSSTransition
                                            in={showLists}
                                            timeout={400}
                                            mountOnEnter
                                            unmountOnExit
                                            classNames="move"
                                        >
                                            <FieldContainer list>
                                                {listsArray.map((element) => (
                                                    <Field
                                                        key={uuidv4()}
                                                        onClick={() =>
                                                            listSelectHandler(
                                                                element
                                                            )
                                                        }
                                                    >
                                                        {element}
                                                    </Field>
                                                ))}
                                            </FieldContainer>
                                        </CSSTransition>
                                    </AddingRow>
                                    <AddingRow>
                                        <Description>Tag:</Description>
                                        <FieldButton
                                            clicked={tagDisplayHandler}
                                            tagValue={buttonTag}
                                        />
                                    </AddingRow>
                                    <AddingRow active={!showTags}>
                                        <CSSTransition
                                            in={showTags}
                                            timeout={400}
                                            mountOnEnter
                                            unmountOnExit
                                            classNames="move"
                                        >
                                            <TagSelector
                                                selectCb={tagSelectHandler}
                                                tagsArray={tagsArray}
                                            />
                                        </CSSTransition>
                                    </AddingRow>
                                    <AddingRow active={warning === ''}>
                                        <Warning>
                                            {warning !== '' ? warning : null}
                                        </Warning>
                                    </AddingRow>
                                    <AddingRow>
                                        <SubmitButton
                                            selected={!!selectedItem.id}
                                            clicked={submitHandler}
                                        >
                                            Add new list item
                                        </SubmitButton>
                                    </AddingRow>
                                </AddingTaskContainer>
                            </CSSTransition>
                        ) : null}
                    </Row>
                    <Row noMargin>
                        {currentList ? (
                            <ListLayout
                                adding={addingTask}
                                listUpdate={listUpdateHandler}
                                selected={!!selectedItem.id}
                            />
                        ) : currentTag.id !== '' ? (
                            <TagLayout
                                adding={addingTask}
                                listUpdate={listUpdateHandler}
                                selected={!!selectedItem.id}
                            />
                        ) : (
                            <Placeholder>
                                Select a list or a tag in the sidebar on the
                                left.
                            </Placeholder>
                        )}
                    </Row>
                </ListWrapper>
                <ListDetails
                    showingPlaceholder={showPlaceholder}
                    selected={!!selectedItem.id}
                />
                {showPlaceholder ? <PlaceholderList /> : null}
            </Wrapper>
        </Provider>
    );
};

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
        currentList: string;
        currentTag: Tag;
        date: any;
    };
    user: {
        mobile: boolean;
        userInfo: {
            tags: { [name: string]: Tag };
            lists: any;
        };
    };
}) => {
    return {
        date: state.list.date,
        tags: state.user.userInfo.tags,
        selectedItem: state.list.selectedItem,
        currentList: state.list.currentList,
        currentTag: state.list.currentTag,
        mobile: state.user.mobile,
        lists: state.user.userInfo.lists
    };
};

const mapDispatchToProps = {
    onSettingMobile: (mobile: boolean) => actions.setMobile(mobile),
    onGettingUserInfo: () => actions.initUserInfo()
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(List));
