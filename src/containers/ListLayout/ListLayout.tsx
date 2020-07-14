import React, {
    useState,
    forwardRef,
    useContext,
    useRef,
    useEffect
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Wrapper, ListContainer, Warning } from './ListLayout.styled';
import ListInput from '../../components/List/ListInput/ListInput';
import SubmitButton from '../../components/List/SubmitButton/SubmitButton';
import DatePicker from '../DatePicker/DatePicker';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from '../../components/List/ListItem/ListItem';
import { updateObject } from '../../shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase/app';
import * as actions from '../../store/actions';
import './ListLayout.css';
import { Item } from '../../types';
import { sizeNumber } from '../../templates/MediaQueries/MediaQueries';
import BackToTopButton from '../../components/UI/BackToTopButton/BackToTopButton';

const ListLayout = forwardRef(
    (props: Props, ref: React.Ref<HTMLInputElement>) => {
        const {
            onGettingUserInfo,
            onSelectingItem,
            onSelectingItemEmpty,
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
        // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

        const initialItem = {
            value: '',
            id: '',
            date: new Date(),
            completed: false,
            notes: []
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

        const { hidden } = useContext(hiddenListContext);

        const inputChangedHandler = (event: React.ChangeEvent) => {
            const target = event.target as HTMLInputElement;
            const updatedData = updateObject(inputItem, {
                value: target.value,
                id: uuidv4()
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
                date: date
            });

            try {
                await docRef
                    .update({
                        [keyNotCompleted]: firebase.firestore.FieldValue.arrayUnion(
                            newItemWithDate
                        )
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
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
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
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
                    .catch((error) => console.log(error))
                    .then((response) => listUpdateHandler())
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
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

        return (
            <Wrapper selected={selected} ref={topRef}>
                <Warning>{warning !== '' ? warning : null}</Warning>
                <ListInput
                    ref={ref}
                    submit={() => {
                        saveNewItem(inputItem).then((response) =>
                            listUpdateHandler()
                        );
                    }}
                    changed={inputChangedHandler}
                    value={inputItem.value}
                    editing={editing}
                />
                <SubmitButton clicked={submitHandler}>
                    Add new list item
                </SubmitButton>
                <DatePicker type="layout" />
                <ListContainer>
                    <TransitionGroup className={'list'}>
                        {!lists[currentList]
                            ? null
                            : hidden
                            ? null
                            : mapHandler(
                                  lists[currentList].listItems.notCompleted,
                                  false
                              )}
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
    user: { userInfo: { lists: any }; mobile: boolean };
    list: { currentList: any; date: any; selectedItem: Item };
}) => {
    return {
        lists: state.user.userInfo.lists,
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
