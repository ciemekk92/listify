import React, { useState, useContext, useRef, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Wrapper, ListContainer } from './ListLayout.styled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from '../../components/ListLayout/ListItem/ListItem';
import { selectItemHandler } from '../../shared/utility';
import { completeItem, deleteItem } from '../../firebase/ListFunctions';
import * as actions from '../../store/actions';
import './ListLayout.css';
import { Item, Tag } from '../../types';
import { Heading3 } from '../../components/UI/Typography/Headings/Headings.styled';

const ListLayout = (props: Props) => {
    const {
        onSelectingItem,
        onSelectingItemEmpty,
        listUpdate,
        adding,
        lists,
        currentList,
        selectedItem,
        selected,
        onSettingMobile
    } = props;

    const [showCompleted, setShowCompleted] = useState(false);
    const [showNotCompleted, setShowNotCompleted] = useState(false);

    const bottomRef = useRef(null);

    const updateMedia = () => {
        onSettingMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => {
            window.removeEventListener('resize', updateMedia);
        };
    });

    const deleteHandler = (id: string) => {
        if (id === selectedItem.id) {
            onSelectingItemEmpty();
        }
        listUpdate();
    };

    const list = lists[currentList];

    useEffect(() => {
        if (lists[currentList]) {
            if (list.listItems.completed.length > 0) {
                setShowCompleted(true);
            } else {
                setShowCompleted(false);
            }
            if (list.listItems.notCompleted.length > 0) {
                setShowNotCompleted(true);
            } else {
                setShowNotCompleted(false);
            }
        }
    }, [list, lists, currentList]);

    const { hidden } = useContext(hiddenListContext);

    let keyCompleted = `lists.${currentList}.listItems.completed`;
    let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

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
                        timeout={400}
                        classNames="move"
                        mountOnEnter
                        unmountOnExit
                        in={hidden}
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
                                        notes: element.notes,
                                        list: element.list,
                                        tag: element.tag
                                    },
                                    selectedItem,
                                    bottomRef,
                                    (arg: Item) => onSelectingItem(arg),
                                    onSelectingItemEmpty
                                )
                            }
                            clickedComplete={() =>
                                completeItem(element.id, () => listUpdate(), {
                                    list: element.list,
                                    tagName: element.tag.name,
                                    lists: lists,
                                    currentList: currentList,
                                    keyNotCompleted: keyNotCompleted,
                                    keyCompleted: keyCompleted,
                                    selectedItem: selectedItem,
                                    onSelectingItem: (arg) =>
                                        onSelectingItem(arg)
                                })
                            }
                            clickedDelete={() =>
                                deleteItem(
                                    element.list,
                                    element.id,
                                    element.completed,
                                    element.tag?.name,
                                    {
                                        lists: lists
                                    }
                                ).then(() => {
                                    deleteHandler(element.id);
                                })
                            }
                        />
                    </CSSTransition>
                ))
        );
    };

    return (
        <Wrapper selected={selected} adding={adding}>
            <ListContainer adding={adding}>
                <CSSTransition
                    in={showNotCompleted && !hidden}
                    timeout={400}
                    classNames="move"
                    mountOnEnter
                    unmountOnExit
                >
                    <Heading3>Tasks not completed</Heading3>
                </CSSTransition>
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
                <CSSTransition
                    in={showCompleted && !hidden}
                    timeout={400}
                    classNames="move"
                    mountOnEnter
                    unmountOnExit
                >
                    <Heading3>Completed tasks</Heading3>
                </CSSTransition>
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
            <div ref={bottomRef} />
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    user: {
        userInfo: { lists: any; tags: { [name: string]: Tag } };
    };
    list: { currentList: string; selectedItem: Item };
}) => {
    return {
        lists: state.user.userInfo.lists,
        tags: state.user.userInfo.tags,
        currentList: state.list.currentList,
        selectedItem: state.list.selectedItem
    };
};

const mapDispatchToProps = {
    onSelectingItem: (item: Item) => actions.setSelectedItem(item),
    onSelectingItemEmpty: () => actions.setSelectedItemEmpty(),
    onSettingMobile: (mobile: boolean) => actions.setMobile(mobile)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    selected: boolean;
    listUpdate(): void;
    adding: boolean;
};

export default connector(React.memo(ListLayout));
