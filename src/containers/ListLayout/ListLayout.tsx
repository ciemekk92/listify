import React, {
    useState,
    forwardRef,
    useContext,
    useRef,
    useEffect
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { hiddenListContext } from '../../context/hiddenListContext';
import {
    Wrapper,
    ListContainer,
    Warning,
    AddingTaskContainer,
    Description,
    TagContainer,
    TagField
} from './ListLayout.styled';
import ListInput from '../../components/ListLayout/ListInput/ListInput';
import SubmitButton from '../../components/ListLayout/SubmitButton/SubmitButton';
import DatePicker from '../DatePicker/DatePicker';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from '../../components/ListLayout/ListItem/ListItem';
import { updateObject } from '../../shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase/app';
import * as actions from '../../store/actions';
import './ListLayout.css';
import { Item, Tag } from '../../types';
import { sizeNumber } from '../../templates/MediaQueries/MediaQueries';
import BackToTopButton from '../../components/UI/BackToTopButton/BackToTopButton';
import { Heading2 } from '../../components/UI/Typography/Heading2/Heading2.styled';
import { Heading3 } from '../../components/UI/Typography/Heading3/Heading3.styled';
import TagButton from '../../components/ListLayout/TagButton/TagButton';

const ListLayout = forwardRef(
    (props: Props, ref: React.Ref<HTMLInputElement>) => {
        const {
            onGettingUserInfo,
            onSelectingItem,
            onSelectingItemEmpty,
            tags,
            lists,
            date,
            currentList,
            selectedItem,
            selected,
            mobile,
            onSettingMobile
        } = props;

        const [editing, setEditing] = useState(false);
        const [warning, setWarning] = useState('');
        const [showCompleted, setShowCompleted] = useState(false);
        const [showNotCompleted, setShowNotCompleted] = useState(false);
        const [showTags, setShowTags] = useState(false);
        const [buttonTag, setButtonTag] = useState({
            name: '',
            id: '',
            color: ''
        });

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
            }
        };
        const [inputItem, setInputItem] = useState(initialItem);

        const bottomRef = useRef(null);
        const topRef = useRef(null);

        const scrollToRef = (ref: any) => {
            if (window.innerWidth <= sizeNumber.tablet) {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }
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
            if (lists[currentList]) {
                if (lists[currentList].listItems.completed.length > 0) {
                    setShowCompleted(true);
                } else {
                    setShowCompleted(false);
                }
                if (lists[currentList].listItems.notCompleted.length > 0) {
                    setShowNotCompleted(true);
                } else {
                    setShowNotCompleted(false);
                }
            }
        }, [lists[currentList]]);

        const { hidden } = useContext(hiddenListContext);

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

        let keyCompleted = `lists.${currentList}.listItems.completed`;
        let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

        const saveNewItem = async (newItem: Item) => {
            const uid: any = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const newItemWithDate = updateObject(newItem, {
                date: date,
                id: uuidv4()
            });

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
            } catch (error) {
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                );
            }
        };

        const deleteItem = async (id: string, completed: boolean) => {
            const uid: any = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const itemToRemove = completed
                ? lists[currentList].listItems.completed.filter(
                      (item: Item) => item.id === id
                  )
                : lists[currentList].listItems.notCompleted.filter(
                      (item: Item) => item.id === id
                  );
            const deleteKey = completed ? keyCompleted : keyNotCompleted;
            try {
                await docRef
                    .update({
                        [deleteKey]: firebase.firestore.FieldValue.arrayRemove(
                            itemToRemove[0]
                        )
                    })
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

        const completeItem = async (id: string) => {
            const uid: any = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const itemToRemove = lists[
                currentList
            ].listItems.notCompleted.filter((item: Item) => item.id === id);
            try {
                await docRef.update({
                    [keyNotCompleted]: firebase.firestore.FieldValue.arrayRemove(
                        itemToRemove[0]
                    )
                });
                const updatedItem = updateObject(itemToRemove[0], {
                    completed: true
                });
                if (selectedItem.id) {
                    onSelectingItem(updatedItem);
                }
                await docRef
                    .update({
                        [keyCompleted]: firebase.firestore.FieldValue.arrayUnion(
                            updatedItem
                        )
                    })
                    .catch((error) =>
                        alert(
                            'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                                error
                        )
                    )
                    .then((response) => listUpdateHandler())
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

        const listUpdateHandler = () => {
            onGettingUserInfo();
            clearInput();
            setEditing(false);
        };

        const selectItemHandler = (item: Item, ref: any) => {
            if (item.id !== selectedItem.id) {
                onSelectingItem(item);
                setTimeout(() => {
                    scrollToRef(ref);
                }, 10);
            } else {
                onSelectingItemEmpty();
            }
        };

        const mapHandler = (listArray: Item[], completed: boolean) => {
            return (
                listArray
                    .slice()
                    // sort alphabetically
                    .sort((a: Item, b: Item) => (a.value > b.value ? 1 : -1))
                    // sort by date - finished recently first for completed items, to be finished first as first for not completed
                    .sort((a: Item, b: Item) =>
                        completed
                            ? new Date(b.date).getTime() -
                              new Date(a.date).getTime()
                            : new Date(a.date).getTime() -
                              new Date(b.date).getTime()
                    )
                    .map((element: Item) => (
                        <CSSTransition
                            key={element.id}
                            timeout={600}
                            classNames="move"
                            mountOnEnter
                            unmountOnExit
                        >
                            <ListItem
                                name={element.value}
                                date={element.date}
                                completed={element.completed}
                                selected={selectedItem.id === element.id}
                                clicked={() =>
                                    selectItemHandler(
                                        {
                                            id: element.id,
                                            value: element.value,
                                            date: element.date,
                                            completed: element.completed,
                                            notes: element.notes
                                        },
                                        bottomRef
                                    )
                                }
                                clickedComplete={() => completeItem(element.id)}
                                clickedDelete={() =>
                                    deleteItem(
                                        element.id,
                                        element.completed
                                    ).then((response) => listUpdateHandler())
                                }
                            />
                        </CSSTransition>
                    ))
            );
        };

        const submitHandler = () => {
            if (inputItem.value === '') {
                setWarning('Name field must not be empty!');
            } else {
                saveNewItem(inputItem).then((response) => listUpdateHandler());
            }
        };

        const tagDisplayHandler = () => {
            setShowTags(!showTags);
        };

        const tagSelectHandler = (tag: Tag) => {
            const updatedItem = updateObject(inputItem, {
                tag: tag
            });
            setInputItem(updatedItem);
            setButtonTag(tag);
            setShowTags(!showTags);
        };

        return (
            <Wrapper selected={selected} ref={topRef}>
                <Heading2>Your tasks</Heading2>
                <AddingTaskContainer>
                    <Description>Task name:</Description>
                    <Description>Date:</Description>
                    <Description>Tag:</Description>
                    <ListInput
                        ref={ref}
                        submit={() => submitHandler()}
                        changed={inputChangedHandler}
                        value={inputItem.value}
                        editing={editing}
                    />
                    <DatePicker type="layout" />
                    <TagButton clicked={tagDisplayHandler} value={buttonTag} />
                    <CSSTransition
                        in={showTags}
                        timeout={400}
                        mountOnEnter
                        unmountOnExit
                        classNames="move"
                    >
                        <TagContainer>
                            <TagField
                                onClick={() =>
                                    tagSelectHandler({
                                        name: '',
                                        id: '',
                                        color: ''
                                    })
                                }
                            >
                                None
                            </TagField>
                            {tags.map((element) => (
                                <TagField
                                    key={element.id}
                                    color={element.color}
                                    onClick={() => tagSelectHandler(element)}
                                >
                                    {element.name}
                                </TagField>
                            ))}
                        </TagContainer>
                    </CSSTransition>
                    <SubmitButton
                        open={!showTags}
                        selected={selected}
                        clicked={submitHandler}
                    >
                        Add new list item
                    </SubmitButton>
                    <Warning>{warning !== '' ? warning : null}</Warning>
                </AddingTaskContainer>

                <ListContainer>
                    {showNotCompleted ? (
                        <Heading3>Tasks not completed</Heading3>
                    ) : null}
                    <TransitionGroup className={'list'}>
                        {!lists[currentList]
                            ? null
                            : hidden
                            ? null
                            : mapHandler(
                                  lists[currentList].listItems.notCompleted,
                                  false
                              )}
                    </TransitionGroup>
                    {showCompleted ? (
                        <Heading3>Completed tasks</Heading3>
                    ) : null}
                    <TransitionGroup className={'list'}>
                        {!lists[currentList]
                            ? null
                            : hidden
                            ? null
                            : mapHandler(
                                  lists[currentList].listItems.completed,
                                  true
                              )}
                    </TransitionGroup>
                </ListContainer>
                {mobile ? (
                    <BackToTopButton clicked={() => scrollToRef(topRef)} />
                ) : null}
                <div ref={bottomRef} />
            </Wrapper>
        );
    }
);

const mapStateToProps = (state: {
    user: { userInfo: { lists: any; tags: Tag[] }; mobile: boolean };
    list: { currentList: any; date: any; selectedItem: Item };
}) => {
    return {
        lists: state.user.userInfo.lists,
        tags: state.user.userInfo.tags,
        currentList: state.list.currentList,
        date: state.list.date,
        selectedItem: state.list.selectedItem,
        mobile: state.user.mobile
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSelectingItem: (item: Item) => actions.setSelectedItem(item),
    onSelectingItemEmpty: () => actions.setSelectedItemEmpty(),
    onSettingMobile: (mobile: boolean) => actions.setMobile(mobile)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & { selected: boolean };

export default connector(React.memo(ListLayout));
