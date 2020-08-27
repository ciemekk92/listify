import React, { useContext, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Heading3 } from '../../components/UI/Typography/Headings/Headings.styled';
import { Item, Tag } from '../../types';
import { ListContainer } from '../ListLayout/ListLayout.styled';
import { Wrapper } from './TagLayout.styled';
import ListItem from '../../components/ListLayout/ListItem/ListItem';
import { completeItem, deleteItem } from '../../firebase/ListFunctions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as actions from '../../store/actions';
import { selectItemHandler } from '../../shared/utility';
import { hiddenListContext } from '../../context/hiddenListContext';

const TagLayout: React.FC<Props> = (props) => {
    const {
        adding,
        listUpdate,
        currentList,
        currentTag,
        lists,
        onSelectingItem,
        onSelectingItemEmpty,
        selectedItem,
        selected,
        tags
    } = props;

    const [showCompleted, setShowCompleted] = useState(false);
    const [showNotCompleted, setShowNotCompleted] = useState(false);

    const topRef = useRef(null);

    let arrayCompleted = tags[currentTag.name].items.filter(
        (element) => element.completed === true
    );

    let arrayNotCompleted = tags[currentTag.name].items.filter(
        (element) => element.completed === false
    );

    const bottomRef = useRef(null);
    const { hidden } = useContext(hiddenListContext);

    useEffect(() => {
        if (currentTag) {
            if (arrayCompleted.length > 0) {
                setShowCompleted(true);
            } else {
                setShowCompleted(false);
            }
            if (arrayNotCompleted.length > 0) {
                setShowNotCompleted(true);
            } else {
                setShowNotCompleted(false);
            }
        }
    }, [currentTag]);

    let keyCompleted = `lists.${currentList}.listItems.completed`;
    let keyNotCompleted = `lists.${currentList}.listItems.notCompleted`;

    const mapHandler = (listArray: Item[], completed: boolean) => {
        return listArray
            .filter((element) => element.tag?.id === currentTag.id)
            .slice()
            .sort((a: Item, b: Item) => (a.value > b.value ? 1 : -1))
            .sort((a: Item, b: Item) =>
                completed
                    ? new Date(b.date).getTime() - new Date(a.date).getTime()
                    : new Date(a.date).getTime() - new Date(b.date).getTime()
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
                                onSelectingItem: (arg) => onSelectingItem(arg)
                            })
                        }
                        clickedDelete={() =>
                            deleteItem(
                                element.list,
                                element.id,
                                element.completed,
                                element.tag.name,
                                {
                                    lists: lists
                                }
                            ).then(() => listUpdate())
                        }
                    />
                </CSSTransition>
            ));
    };
    return (
        <Wrapper selected={selected} ref={topRef} adding={adding}>
            <ListContainer adding={adding}>
                {showNotCompleted ? (
                    <Heading3>Tasks not completed</Heading3>
                ) : null}
                <TransitionGroup className={'list'}>
                    {!currentTag.items
                        ? null
                        : hidden
                        ? null
                        : mapHandler(arrayNotCompleted, false)}
                </TransitionGroup>
                {showCompleted ? <Heading3>Completed tasks</Heading3> : null}
                <TransitionGroup className={'list'}>
                    {!currentTag.items
                        ? null
                        : hidden
                        ? null
                        : mapHandler(arrayCompleted, true)}
                </TransitionGroup>
            </ListContainer>
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: {
        currentTag: Tag;
        currentList: string;
        selectedItem: Item;
    };
    user: {
        userInfo: {
            lists: any;
            tags: { [key: string]: Tag };
        };
    };
}) => {
    return {
        currentList: state.list.currentList,
        currentTag: state.list.currentTag,
        selectedItem: state.list.selectedItem,
        lists: state.user.userInfo.lists,
        tags: state.user.userInfo.tags
    };
};

const mapDispatchToProps = {
    onSelectingItem: (item: Item) => actions.setSelectedItem(item),
    onSelectingItemEmpty: () => actions.setSelectedItemEmpty()
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    adding: boolean;
    selected: boolean;
    listUpdate(): void;
};

export default connector(React.memo(TagLayout));
