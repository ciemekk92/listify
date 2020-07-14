import React, { useState, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { hiddenListContext } from '../../context/hiddenListContext';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { Bar, ButtonsContainer, Logo, PanelText } from './Sidebar.styled';
import SidebarModal from '../../components/UI/Sidebar/SidebarModal/SidebarModal';
import NewListInput from '../../components/UI/Sidebar/NewList/NewListInput/NewListInput';
import PanelContainer from '../../components/UI/Sidebar/PanelContainer/PanelContainer';
import ListPanel from '../../components/UI/Sidebar/ListPanel/ListPanel';
import AddNewList from '../../components/UI/Sidebar/NewList/AddNewList';
import { Item, List } from '../../types';
import logo from '../../assets/logo.png';
import EditButton from '../../components/Details/EditButton/EditButton';

const Sidebar: React.FC<Props> = (props) => {
    const {
        lists,
        selectedItem,
        currentList,
        onSettingCurrentList,
        onGettingUserInfo,
        onSettingSelectedItemEmpty,
        open,
        setOpen,
        mobile
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
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
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
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
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
                console.log(error);
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
            console.log(error);
        }
    };

    let listsArray = Object.keys(lists).sort();

    useDidMountEffect(() => {
        onSettingCurrentList(listsArray[0]);
    }, [listsArray.length]);

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
            <Logo>
                <img
                    src={logo}
                    alt={'Logo'}
                    style={{ width: '75%', height: '75%' }}
                />
            </Logo>
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
                                    clicked={() => currentListHandler(element)}
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
        mobile: boolean;
    };
    list: {
        currentList: any;
        selectedItem: Item;
    };
}) => {
    return {
        lists: state.user.userInfo.lists,
        selectedItem: state.list.selectedItem,
        currentList: state.list.currentList,
        mobile: state.user.mobile
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
