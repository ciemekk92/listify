import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import { hiddenListContext } from '../../context/hiddenListContext';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { Bar, LogoPlaceholder } from './Sidebar.styled';
import SidebarModal from '../../components/UI/Sidebar/SidebarModal/SidebarModal';
import NewListInput from '../../components/UI/Sidebar/NewList/NewListInput/NewListInput';
import PanelContainer from '../../components/UI/Sidebar/PanelContainer/PanelContainer';
import ListPanel from '../../components/UI/Sidebar/ListPanel/ListPanel';
import AddNewList from '../../components/UI/Sidebar/NewList/AddNewList';

const Sidebar = (props) => {
    const {
        lists,
        selectedCurrentList,
        onSettingCurrentList,
        onGettingUserInfo
    } = props;

    const [newList, setNewList] = useState({
        name: '',
        id: null,
        timestamp: null,
        listItems: []
    });

    const { handleClick } = useContext(hiddenListContext);

    const [addingList, setAddingList] = useState(false);

    const newListHandler = async (list) => {
        setAddingList(false);
        if (newList.name !== '') {
            const uid = localStorage.getItem('currentUser');
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
        }
    };

    const inputChangedHandler = (event) => {
        const updatedData = updateObject(newList, {
            name: event.target.value,
            id: uuidv4()
        });
        setNewList(updatedData);
    };

    const toggleAdding = () => {
        setAddingList(!addingList);
    };

    const currentListHandler = (list) => {
        if (list !== selectedCurrentList) {
            handleClick(true);
            onSettingCurrentList(list);
            setTimeout(() => {
                handleClick(false);
            }, 500);
        }
    };

    let listsArray = Object.keys(lists);

    useDidMountEffect(() => {
        onSettingCurrentList(listsArray[0]);
    }, [listsArray.length]);

    return (
        <Bar>
            <SidebarModal open={addingList} modalClosed={toggleAdding}>
                <NewListInput
                    changed={inputChangedHandler}
                    value={newList.name}
                    submit={() => newListHandler(newList)}
                />
            </SidebarModal>
            <LogoPlaceholder>Listify</LogoPlaceholder>
            <PanelContainer>
                {lists
                    ? listsArray.map((element) => (
                          <ListPanel
                              active={selectedCurrentList === element}
                              name={element}
                              key={uuidv4()}
                              clicked={() => currentListHandler(element)}
                          />
                      ))
                    : null}
            </PanelContainer>
            <AddNewList clicked={!addingList ? toggleAdding : newListHandler} />
        </Bar>
    );
};

const mapStateToProps = (state) => {
    return {
        lists: state.user.userInfo.lists,
        selectedCurrentList: state.list.currentList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingUserInfo: () => dispatch(actions.initUserInfo()),
        onSettingCurrentList: (list) => dispatch(actions.setCurrentList(list))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Sidebar));
