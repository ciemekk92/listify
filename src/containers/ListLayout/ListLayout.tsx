import React, { useState, forwardRef, useContext } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Wrapper, ListContainer } from './ListLayout.styled';
import ListInput from '../../components/List/ListInput/ListInput';
import SubmitButton from '../../components/List/SubmitButton/SubmitButton';
import DatePicker from '../DatePicker/DatePicker';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from '../../components/List/ListItem/ListItem';
import { updateObject } from '../../shared/utility';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase';
import * as actions from '../../store/actions';
import './ListLayout.css';
import { Item } from '../../types/Item'

const ListLayout = forwardRef(
    (props: PropsFromRedux, ref: React.Ref<HTMLInputElement>) => {
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
            id: '',
            date: new Date(),
            completed: false
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
            setInputItem(
                updateObject(inputItem, {
                    value: ''
                })
            );
        };

        let key = `lists.${currentList}.listItems`;

        const saveNewItem = async (newItem: Item) => {
            const uid: any = localStorage.getItem('currentUser');
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

        const deleteItem = async (id: string) => {
            const uid: any = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const itemToRemove = lists[currentList].listItems.filter(
                (item: Item) => item.id === id
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

        const completeItem = async (id: string) => {
            const uid: any = localStorage.getItem('currentUser');
            const docRef = await firestore.collection('users').doc(uid);
            const itemToRemove = lists[currentList].listItems.filter(
                (item: Item) => item.id === id
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
                        [key]: firebase.firestore.FieldValue.arrayUnion(
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

        const selectItemHandler = (item: Item) => {
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
                                      (a: Item, b: Item) =>
                                          new Date(b.date).getTime() -
                                          new Date(a.date).getTime()
                                  )
                                  .map((element: Item) => (
                                      <CSSTransition
                                          key={element.id}
                                          timeout={1000}
                                          classNames="move"
                                      >
                                          <ListItem
                                              name={element.value}
                                              date={element.date}
                                              completed={element.completed}
                                              clicked={() =>
                                                  selectItemHandler({
                                                      id: element.id,
                                                      value: element.value,
                                                      date: element.date,
                                                      completed:
                                                          element.completed
                                                  })
                                              }
                                              clickedComplete={() =>
                                                  completeItem(element.id)
                                              }
                                              clickedDelete={() =>
                                                  deleteItem(
                                                      element.id
                                                  ).then((response) =>
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
    }
);

const mapStateToProps = (state: {
    user: { userInfo: { lists: any } };
    list: { currentList: any; date: any; selectedItem: any };
}) => {
    return {
        lists: state.user.userInfo.lists,
        currentList: state.list.currentList,
        date: state.list.date,
        selectedItem: state.list.selectedItem
    };
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo(),
    onSelectingItem: (item: Item) => actions.setSelectedItem(item)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(ListLayout));
