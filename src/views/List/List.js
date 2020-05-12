import React, { useState, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { updateObject } from '../../shared/utility';
import { Wrapper } from './List.styled';
import ListInput from '../../components/List/ListInput/ListInput';
import ListButton from '../../components/List/ListButton/ListButton';
import ListContainer from '../../components/List/ListContainer/ListContainer';
import ListItem from '../../components/List/ListItem/ListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './List.css';
import * as actions from '../../store/actions';
import DatePicker from '../../containers/DatePicker/DatePicker';

const List = forwardRef((props, ref) => {
    const { onGettingUserInfo, loading, items } = props;
    const [inputItem, setInputItem] = useState({
        value: '',
        id: null,
        date: null
    });

    const [editing, setEditing] = useState(false);

    const inputChangedHandler = (event) => {
        const updatedData = updateObject(inputItem, {
            value: event.target.value,
            id: uuidv4()
        });
        setInputItem(updatedData);
        setEditing(true);
    };

    const clearInput = () => {
        setInputItem(
            updateObject(inputItem, {
                value: ''
            })
        );
    };

    const saveNewItem = async (newItem) => {
        const uid = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        try {
            await docRef
                .update({
                    listItems: firebase.firestore.FieldValue.arrayUnion(newItem)
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        const uid = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const itemToRemove = items.filter((item) => item.id === id);
        try {
            await docRef
                .update({
                    listItems: firebase.firestore.FieldValue.arrayRemove(
                        itemToRemove[0]
                    )
                })
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

    return (
        <Wrapper>
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
            <ListButton
                clicked={() => {
                    saveNewItem(inputItem).then((response) =>
                        listUpdateHandler()
                    );
                }}
            >
                Add new list item
            </ListButton>
            <DatePicker />
            <ListContainer>
                <TransitionGroup className={'list'}>
                    {items
                        ? items.map(({ id, value }) => (
                              <CSSTransition
                                  key={id}
                                  timeout={500}
                                  classNames="move"
                              >
                                  <ListItem
                                      name={value}
                                      clicked={() =>
                                          deleteItem(id).then((response) =>
                                              listUpdateHandler()
                                          )
                                      }
                                  />
                              </CSSTransition>
                          ))
                        : null}
                </TransitionGroup>
            </ListContainer>
        </Wrapper>
    );
});

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        items: state.user.userInfo.listItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingUserInfo: () => dispatch(actions.initUserInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(List));
