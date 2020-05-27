import React, { useState, forwardRef, useContext } from 'react';
import { connect } from 'react-redux';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Wrapper } from '../../views/List/List.styled';
import ListInput from '../../components/List/ListInput/ListInput';
import SubmitButton from '../../components/List/SubmitButton/SubmitButton';
import DatePicker from '../DatePicker/DatePicker';
import ListContainer from '../../components/List/ListContainer/ListContainer';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from '../../components/List/ListItem/ListItem';
import { updateObject } from '../../shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase';
import * as actions from '../../store/actions';
import './ListLayout.css';

const ListLayout = forwardRef((props, ref) => {
    const {
        onGettingUserInfo,
        onSelectingItem,
        lists,
        date,
        currentList,
        selectedItem
    } = props;

    const [editing, setEditing] = useState(false);
    const [inputItem, setInputItem] = useState({
        value: '',
        id: null,
        date: null,
        completed: false
    });

    const { hidden } = useContext(hiddenListContext);

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

    let key = `lists.${currentList}.listItems`;

    const saveNewItem = async (newItem) => {
        const uid = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const newItemWithDate = updateObject(newItem, {
            date: date
        });
        try {
            await docRef
                .update({
                    [key]: firebase.firestore.FieldValue.arrayUnion(
                        newItemWithDate
                    )
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        const uid = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const itemToRemove = lists[currentList].listItems.filter(
            (item) => item.id === id
        );
        try {
            await docRef
                .update({
                    [key]: firebase.firestore.FieldValue.arrayRemove(
                        itemToRemove[0]
                    )
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };

    const completeItem = async (id) => {
        const uid = localStorage.getItem('currentUser');
        const docRef = await firestore.collection('users').doc(uid);
        const itemToRemove = lists[currentList].listItems.filter(
            (item) => item.id === id
        );
        try {
            await docRef.update({
                [key]: firebase.firestore.FieldValue.arrayRemove(
                    itemToRemove[0]
                )
            });
            const updatedItem = updateObject(itemToRemove[0], {
                completed: true
            });
            await docRef
                .update({
                    [key]: firebase.firestore.FieldValue.arrayUnion(updatedItem)
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

    const selectItemHandler = (item) => {
        if (item.id !== selectedItem.id) {
            onSelectingItem(item);
        }
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
            <SubmitButton
                clicked={() => {
                    saveNewItem(inputItem).then((response) =>
                        listUpdateHandler()
                    );
                }}
            >
                Add new list item
            </SubmitButton>
            <DatePicker />
            <ListContainer>
                <TransitionGroup className={'list'}>
                    {!lists[currentList]
                        ? null
                        : hidden
                        ? null
                        : lists[currentList].listItems
                              .slice()
                              .sort(
                                  (a, b) => new Date(b.date) - new Date(a.date)
                              )
                              .map(({ id, value, date, completed }) => (
                                  <CSSTransition
                                      key={id}
                                      timeout={1000}
                                      classNames="move"
                                      addEndListener={(node, done) => {
                                          node.addEventListener(
                                              'transitionend',
                                              done,
                                              false
                                          );
                                      }}
                                  >
                                      <ListItem
                                          name={value}
                                          date={date}
                                          completed={completed}
                                          clicked={() =>
                                              selectItemHandler({
                                                  id: id,
                                                  value: value,
                                                  date: date,
                                                  completed: completed
                                              })
                                          }
                                          clickedComplete={() =>
                                              completeItem(id)
                                          }
                                          clickedDelete={() =>
                                              deleteItem(id).then((response) =>
                                                  listUpdateHandler()
                                              )
                                          }
                                      />
                                  </CSSTransition>
                              ))}
                </TransitionGroup>
            </ListContainer>
        </Wrapper>
    );
});

const mapStateToProps = (state) => {
    return {
        lists: state.user.userInfo.lists,
        currentList: state.list.currentList,
        date: state.list.date,
        selectedItem: state.list.selectedItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingUserInfo: () => dispatch(actions.initUserInfo()),
        onSelectingItem: (id) => dispatch(actions.setSelectedItem(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(ListLayout));
