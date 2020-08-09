import React, { useState, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { hiddenListContext } from '../../context/hiddenListContext';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { Bar, ButtonsContainer, PanelText, LabelPanel } from './Sidebar.styled';
import SidebarModal from '../../components/UI/Sidebar/SidebarModal/SidebarModal';
import NewListInput from '../../components/UI/Sidebar/NewList/NewListInput/NewListInput';
import PanelContainer from '../../components/UI/Sidebar/PanelContainer/PanelContainer';
import ListPanel from '../../components/UI/Sidebar/ListPanel/ListPanel';
import AddNewList from '../../components/UI/Sidebar/NewList/AddNewList';
import { Item, List } from '../../types';
import EditButton from '../../components/Details/EditButton/EditButton';
import { Home, Unread, Github, Mail } from '../../components/Icons';
import { CSSTransition } from 'react-transition-group';
import './Sidebar.css';

const Sidebar: React.FC<Props> = (props) => {
    const {
        lists,
        selectedItem,
        currentList,
        onSettingCurrentList,
        onGettingUserInfo,
        onSettingSelectedItemEmpty,
        open,
        setOpen
    } = props;

    const [newList, setNewList] = useState({
        name: '',
        id: '',
        timestamp: 0,
        listItems: {
            completed: [],
            notCompleted: []
        }
    });

    const { handleClick } = useContext(hiddenListContext);

    const [addingList, setAddingList] = useState(false);
    const [deletingList, setDeletingList] = useState(false);
    const [listToDelete, setListToDelete] = useState('');
    const [warning, setWarning] = useState('');
    const [isShown, setIsShown] = useState(false);

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(newList, {
            name: target.value,
            id: uuidv4()
        });
        setNewList(updatedData);
    };

    const toggleAdding = () => {
        setAddingList(!addingList);
        setWarning('');
    };

    const toggleDeleting = () => {
        setDeletingList(!deletingList);
    };

    const currentListHandler = (list: string) => {
        if (list !== currentList) {
            handleClick(true);
            onSettingCurrentList(list);
            setOpen();
            if (selectedItem.id) {
                onSettingSelectedItemEmpty();
            }
            setTimeout(() => {
                handleClick(false);
            }, 500);
        }
    };

    const newListHandler = async (list: List) => {
        if (newList.name !== '') {
            setAddingList(false);
            const uid: any = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const listWithTimestamp = updateObject(list, {
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            let key = `lists.${list.name}`;

            try {
                await docRef
                    .update({
                        [key]: listWithTimestamp
                    })
                    .then((response) => onGettingUserInfo())
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
        } else {
            setWarning('Name of the list must not be empty!');
        }
    };

    const deleteList = async (list: string) => {
        const uid: any = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);

        let key = `lists.${list}`;

        try {
            await docRef
                .update({
                    [key]: firebase.firestore.FieldValue.delete()
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

    const deleteListHandler = (list: string) => {
        if (
            lists[list].listItems.completed.length !== 0 ||
            lists[list].listItems.notCompleted.length !== 0
        ) {
            setListToDelete(list);
            toggleDeleting();
        } else {
            try {
                deleteList(list).then((response) => {
                    onGettingUserInfo();
                });
            } catch (error) {
                alert(
                    'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                        error
                );
            }
        }
    };

    const handleConfirm = () => {
        try {
            deleteList(listToDelete).then((response) => {
                toggleDeleting();
                onGettingUserInfo();
            });
        } catch (error) {
            alert(
                'Something went wrong. Refresh the page and try again. If a problem persists message the author at https://www.facebook.com/przemyslaw.reducha/ ' +
                    error
            );
        }
    };

    const handleListVisibility = () => {
        setIsShown(!isShown);
    };

    let listsArray = Object.keys(lists).sort();

    useDidMountEffect(() => {
        onSettingCurrentList(listsArray[0]);
    }, [listsArray.length]);

    // TODO Rework layout
    return (
        <Bar open={open}>
            <SidebarModal
                open={addingList}
                modalClosed={toggleAdding}
                warning={warning}
            >
                Enter new list name below.
                <NewListInput
                    changed={inputChangedHandler}
                    value={newList.name}
                    submit={() => newListHandler(newList)}
                />
                <ButtonsContainer>
                    <EditButton
                        type={'confirm'}
                        title={'Confirm adding new list'}
                        clicked={() => newListHandler(newList)}
                        size={16}
                    />
                    <EditButton
                        type={'cancel'}
                        title={'Cancel'}
                        clicked={() => setAddingList(!addingList)}
                        size={16}
                    />
                </ButtonsContainer>
            </SidebarModal>
            <SidebarModal open={deletingList} modalClosed={toggleDeleting}>
                This will delete ALL tasks saved in the list. <br /> Are you
                sure?
                <ButtonsContainer>
                    <EditButton
                        type={'confirm'}
                        title={'Confirm deleting'}
                        clicked={handleConfirm}
                        size={16}
                    />
                    <EditButton
                        type={'cancel'}
                        title={'Cancel'}
                        clicked={() => setDeletingList(false)}
                        size={16}
                    />
                </ButtonsContainer>
            </SidebarModal>
            {/*TODO: Set correct routing here */}
            <LabelPanel>
                <Home
                    size={24}
                    color={'#666'}
                    title={'Home'}
                    style={{ marginLeft: '2rem' }}
                />
                <p>Home</p>
            </LabelPanel>
            <LabelPanel onClick={handleListVisibility}>
                <Unread
                    size={24}
                    title={'My lists'}
                    color={'#666'}
                    style={{ marginLeft: '2rem' }}
                />
                <p>My lists</p>
            </LabelPanel>
            <CSSTransition
                in={isShown}
                timeout={500}
                classNames={'lists'}
                mountOnEnter
                unmountOnExit
            >
                <PanelContainer>
                    {
                        // sort alphabetically
                        listsArray.length !== 0 ? (
                            listsArray
                                .slice()
                                .sort()
                                .map((element) => (
                                    <ListPanel
                                        active={currentList === element}
                                        name={element}
                                        key={uuidv4()}
                                        clicked={() =>
                                            currentListHandler(element)
                                        }
                                        clickedDelete={() =>
                                            deleteListHandler(element)
                                        }
                                        mobileClicked={() => setOpen()}
                                    />
                                ))
                        ) : (
                            <PanelText>
                                Create a new list by clicking + down below!
                            </PanelText>
                        )
                    }
                </PanelContainer>
            </CSSTransition>
            <LabelPanel>
                <Github
                    size={24}
                    title={'Github'}
                    color={'#666'}
                    style={{ marginLeft: '2rem' }}
                />
                <a href="https://github.com/ciemekk92/listify" target="_blank">
                    <p>GitHub Repository</p>
                </a>
            </LabelPanel>
            <LabelPanel>
                <Mail
                    size={24}
                    title={'Contact'}
                    color={'#666'}
                    style={{ marginLeft: '2rem' }}
                />
                <a href="mailto: przemyslaw.reducha@gmail.com">
                    <p>Contact Author</p>
                </a>
            </LabelPanel>
            <AddNewList
                clicked={
                    !addingList ? toggleAdding : () => newListHandler(newList)
                }
            />
        </Bar>
    );
};

const mapStateToProps = (state: {
    user: {
        userInfo: {
            lists: any;
        };
    };
    list: {
        currentList: any;
        selectedItem: Item;
    };
}) => {
    return {
        lists: state.user.userInfo.lists,
        selectedItem: state.list.selectedItem,
        currentList: state.list.currentList
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSettingCurrentList: (list: string) => actions.setCurrentList(list),
    onSettingSelectedItemEmpty: () => actions.setSelectedItemEmpty()
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    open: boolean;
    setOpen(): void;
};

export default connector(React.memo(Sidebar));
