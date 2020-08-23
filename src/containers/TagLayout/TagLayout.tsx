import React, { useContext, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Wrapper } from './TagLayout.styled';
import { Heading3 } from '../../components/UI/Typography/Headings/Headings.styled';
import { Item, Tag } from '../../types';
import { ListContainer } from '../ListLayout/ListLayout.styled';
import ListItem from '../../components/ListLayout/ListItem/ListItem';
import { completeItem, deleteItem } from '../../firebase/ListFunctions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as actions from '../../store/actions';
import { selectItemHandler } from '../../shared/utility';
import { hiddenListContext } from '../../context/hiddenListContext';

const TagLayout: React.FC<Props> = (props) => {
    const {
        listUpdate,
        currentList,
        currentTag,
        lists,
        onSelectingItem,
        onSelectingItemEmpty,
        selectedItem,
        tags
    } = props;

    const [showCompleted, setShowCompleted] = useState(false);
    const [showNotCompleted, setShowNotCompleted] = useState(false);

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

    // TODO: Finish tags - completing/deleting tasks synced with certain lists

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
                                    notes: element.notes
                                },
                                selectedItem,
                                bottomRef,
                                (arg: Item) => onSelectingItem(arg),
                                onSelectingItemEmpty
                            )
                        }
                        clickedComplete={() =>
                            completeItem(element.id, () => listUpdate(), {
                                lists: lists,
                                currentList: currentList,
                                keyNotCompleted: keyNotCompleted,
                                keyCompleted: keyCompleted,
                                selectedItem: selectedItem,
                                onSelectingItem: (arg) => onSelectingItem(arg)
                            })
                        }
                        clickedDelete={() =>
                            deleteItem(element.id, element.completed, {
                                lists: lists,
                                currentList: currentList,
                                keyCompleted: keyCompleted,
                                keyNotCompleted: keyNotCompleted
                            }).then(() => listUpdate())
                        }
                    />
                </CSSTransition>
            ));
    };
    return (
        <Wrapper>
            <ListContainer>
                {showNotCompleted ? (
                    <Heading3>Tasks not completed</Heading3>
                ) : null}
                <TransitionGroup className={'list'}>
                    {currentTag.items
                        ? mapHandler(arrayNotCompleted, false)
                        : null}
                </TransitionGroup>
                {showCompleted ? <Heading3>Completed tasks</Heading3> : null}
                <TransitionGroup>
                    {currentTag.items ? mapHandler(arrayCompleted, true) : null}
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
type Props = PropsFromRedux & { selected: boolean; listUpdate(): void };

export default connector(React.memo(TagLayout));
