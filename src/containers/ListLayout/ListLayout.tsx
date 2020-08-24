import React, {
    useState,
    forwardRef,
    useContext,
    useRef,
    useEffect
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { hiddenListContext } from '../../context/hiddenListContext';
import { Wrapper, ListContainer } from './ListLayout.styled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ListItem from '../../components/ListLayout/ListItem/ListItem';
import { scrollToRef, selectItemHandler } from '../../shared/utility';
import { completeItem, deleteItem } from '../../firebase/ListFunctions';
import * as actions from '../../store/actions';
import './ListLayout.css';
import { Item, Tag } from '../../types';

import BackToTopButton from '../../components/UI/BackToTopButton/BackToTopButton';
import { Heading3 } from '../../components/UI/Typography/Headings/Headings.styled';

const ListLayout = forwardRef(
    (props: Props, ref: React.Ref<HTMLInputElement>) => {
        const {
            onSelectingItem,
            onSelectingItemEmpty,
            listUpdate,
            adding,
            lists,
            currentList,
            selectedItem,
            selected,
            mobile,
            onSettingMobile
        } = props;

        const [showCompleted, setShowCompleted] = useState(false);
        const [showNotCompleted, setShowNotCompleted] = useState(false);

        const bottomRef = useRef(null);
        const topRef = useRef(null);

        const updateMedia = () => {
            onSettingMobile(window.innerWidth <= 768);
        };

        useEffect(() => {
            window.addEventListener('resize', updateMedia);
            return () => {
                window.removeEventListener('resize', updateMedia);
            };
        });

        useEffect(() => {
            if (lists[currentList]) {
                if (lists[currentList].listItems.completed.length > 0) {
                    setShowCompleted(true);
                } else {
                    setShowCompleted(false);
                }
                if (lists[currentList].listItems.notCompleted.length > 0) {
                    setShowNotCompleted(true);
                } else {
                    setShowNotCompleted(false);
                }
            }
        }, [lists[currentList]]);

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
                                    completeItem(
                                        element.id,
                                        () => listUpdate(),
                                        {
                                            lists: lists,
                                            currentList: currentList,
                                            keyNotCompleted: keyNotCompleted,
                                            keyCompleted: keyCompleted,
                                            selectedItem: selectedItem,
                                            onSelectingItem: (arg) =>
                                                onSelectingItem(arg)
                                        }
                                    )
                                }
                                clickedDelete={() =>
                                    deleteItem(
                                        element.list,
                                        element.id,
                                        element.completed,
                                        element.tag?.name,
                                        {
                                            lists: lists,
                                            currentList: currentList,
                                            keyCompleted: keyCompleted,
                                            keyNotCompleted: keyNotCompleted
                                        }
                                    ).then(() => listUpdate())
                                }
                            />
                        </CSSTransition>
                    ))
            );
        };

        return (
            <Wrapper selected={selected} ref={topRef} adding={adding}>
                <ListContainer adding={adding}>
                    {showNotCompleted ? (
                        <Heading3>Tasks not completed</Heading3>
                    ) : null}
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
                    {showCompleted ? (
                        <Heading3>Completed tasks</Heading3>
                    ) : null}
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
                {mobile ? (
                    <BackToTopButton clicked={() => scrollToRef(topRef)} />
                ) : null}
                <div ref={bottomRef} />
            </Wrapper>
        );
    }
);

const mapStateToProps = (state: {
    user: { userInfo: { lists: any; tags: Tag[] }; mobile: boolean };
    list: { currentList: string; selectedItem: Item };
}) => {
    return {
        lists: state.user.userInfo.lists,
        tags: state.user.userInfo.tags,
        currentList: state.list.currentList,
        selectedItem: state.list.selectedItem,
        mobile: state.user.mobile
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
