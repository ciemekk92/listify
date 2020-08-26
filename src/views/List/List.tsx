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
    Row,
    Wrapper
} from './List.styled';
import './List.css';
import Burger from '../../components/Sidebar/Burger/Burger';
import { Heading2 } from '../../components/UI/Typography/Headings/Headings.styled';
import {
    AddingTaskContainer,
    AddingTaskToggle,
    Description,
    FieldContainer,
    Field,
    Warning
} from '../../containers/ListLayout/ListLayout.styled';
import { Plus } from '../../components/Icons';
import { CSSTransition } from 'react-transition-group';
import ListInput from '../../components/ListLayout/ListInput/ListInput';
import DatePicker from '../../containers/DatePicker/DatePicker';
import SubmitButton from '../../components/ListLayout/SubmitButton/SubmitButton';
import { updateObject } from '../../shared/utility';
import { firestore } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import FieldButton from '../../components/ListLayout/FieldButton/FieldButton';

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
        setInputItem(initialItem);
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

    useEffect(() => {
        if (currentList) {
            setButtonList(currentList);
            const updatedItem = updateObject(inputItem, {
                list: currentList
            });
            setInputItem(updatedItem);
        }
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

        let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;
        let keyWithTag = `tags.${newItem.tag?.name}.items`;

        try {
            await docRef
                .update({
                    [keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                        newItemWithDate
                    )
                })
                .catch((error) =>
                    alert(
                        'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                            error
                    )
                );
            if (newItem.tag.name !== '') {
                await docRef
                    .update({
                        [keyWithTag]: firebase.firestore.FieldValue.arrayUnion(
                            newItemWithDate
                        )
                    })
                    .catch((error) =>
                        alert(
                            'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                                error
                        )
                    );
            }
        } catch (error) {
            alert(
                'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                    error
            );
        }
    };

    // TODO: fix padding and adding view in tags layout (maybe after completing task)

    let tagsArray = Object.values(tags);
    let listsArray = Object.keys(lists).sort();

    return (
        <Provider value={{ hidden, handleClick }}>
            {mobile ? <Burger open={open} setOpen={openHandler} /> : null}
            <Sidebar open={open} setOpen={openHandler} />
            <Wrapper>
                <ListWrapper>
                    <Row>
                        <Heading2>Your tasks</Heading2>
                        <AddingTaskToggle onClick={toggleAddingTask}>
                            <Plus
                                size={32}
                                title={'Add new task'}
                                color={'#fff'}
                            />
                        </AddingTaskToggle>
                    </Row>
                    {/*<CSSTransition
                        in={addingTask}
                        mountOnEnter
                        unmountOnExit
                        timeout={400}
                        classNames="add"
                    >*/}
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
                                                listSelectHandler(element)
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
                            <CSSTransition
                                in={showTags}
                                timeout={400}
                                mountOnEnter
                                unmountOnExit
                                classNames="move"
                            >
                                <FieldContainer>
                                    <Field
                                        onClick={() =>
                                            tagSelectHandler({
                                                name: '',
                                                id: '',
                                                color: ''
                                            })
                                        }
                                    >
                                        None
                                    </Field>
                                    {tagsArray.map((element) => (
                                        <Field
                                            key={element.id}
                                            color={element.color}
                                            onClick={() =>
                                                tagSelectHandler({
                                                    name: element.name,
                                                    id: element.id,
                                                    color: element.color
                                                })
                                            }
                                        >
                                            {element.name}
                                        </Field>
                                    ))}
                                </FieldContainer>
                            </CSSTransition>
                        </AddingRow>
                        <AddingRow>
                            <Warning>{warning !== '' ? warning : null}</Warning>
                        </AddingRow>
                        <AddingRow>
                            <SubmitButton
                                open={!showTags}
                                selected={!!selectedItem.id}
                                clicked={submitHandler}
                            >
                                Add new list item
                            </SubmitButton>
                        </AddingRow>
                    </AddingTaskContainer>
                    {/*</CSSTransition>*/}
                    {currentList ? (
                        <>
                            <ListLayout
                                adding={addingTask}
                                listUpdate={listUpdateHandler}
                                selected={!!selectedItem.id}
                            />
                        </>
                    ) : currentTag.id !== '' ? (
                        <>
                            <TagLayout
                                listUpdate={listUpdateHandler}
                                selected={!!selectedItem.id}
                            />
                        </>
                    ) : (
                        <Placeholder>
                            Select a list or a tag in the sidebar on the left.
                        </Placeholder>
                    )}
                </ListWrapper>
                <ListDetails selected={!!selectedItem.id} />
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
            tags: Tag[];
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
