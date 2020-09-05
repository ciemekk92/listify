import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Value, Wrapper } from './ListDetails.styled';
import Name from '../../components/ListDetails/Name/Name';
import DateContainer from '../../components/ListDetails/Date/DateContainer';
import Completed from '../../components/ListDetails/Completed/Completed';
import Notes from '../../components/ListDetails/Notes/Notes';
import { Item } from '../../types';
import { Heading2 } from '../../components/UI/Typography/Headings/Headings.styled';
import { Row, RowWithCompletion } from './ListDetails.styled';
import { Description } from '../ListLayout/ListLayout.styled';
import EditButton from '../../components/ListDetails/EditButton/EditButton';
import { CSSTransition } from 'react-transition-group';
import Tag from '../../components/ListDetails/Tag/Tag';

const Details: React.FC<Props> = (props) => {
    const { showingPlaceholder, selected, selectedItem } = props;

    const [editingName, setEditingName] = useState(false);
    const [editingDate, setEditingDate] = useState(false);
    const [editingNotes, setEditingNotes] = useState(false);
    const [editingTag, setEditingTag] = useState(false);

    const [isNameEditShown, setIsNameEditShown] = useState(false);
    const [isDateEditShown, setIsDateEditShown] = useState(false);
    const [isTagEditShown, setIsTagEditShown] = useState(false);
    const [isNotesEditShown, setIsNotesEditShown] = useState(false);

    const editNameHandler = () => {
        setEditingName(!editingName);
    };

    const editDateHandler = () => {
        setEditingDate(!editingDate);
    };

    const editTagHandler = () => {
        setEditingTag(!editingTag);
    };

    const editNotesHandler = () => {
        setEditingNotes(!editingNotes);
    };

    // FIXME: handle editing data in tags as well
    // TODO: switch regular transitions into react-transition-group (notes done)- it won't render components, when they're not needed

    return (
        <Wrapper selected={selected} showingPlaceholder={showingPlaceholder}>
            <Heading2>Task details</Heading2>
            <RowWithCompletion
                onMouseEnter={() => setIsNameEditShown(true)}
                onMouseLeave={() => setIsNameEditShown(false)}
            >
                <Description>Task:</Description>
                <Value big>{selectedItem.value}</Value>
                <Completed />
                <CSSTransition
                    in={isNameEditShown}
                    timeout={500}
                    classNames="move"
                    mountOnEnter
                    unmountOnExit
                >
                    <EditButton
                        title={'Edit task name'}
                        clicked={editNameHandler}
                        type="edit"
                        size={16}
                        name
                    />
                </CSSTransition>
            </RowWithCompletion>
            <Name
                editing={editingName}
                clickedCancel={() => setEditingName(false)}
            />
            <Row
                onMouseEnter={() => setIsDateEditShown(true)}
                onMouseLeave={() => setIsDateEditShown(false)}
            >
                <Description>Date:</Description>
                <Value>{selectedItem.date}</Value>
                <CSSTransition
                    in={isDateEditShown}
                    timeout={500}
                    classNames="move"
                    mountOnEnter
                    unmountOnExit
                >
                    <EditButton
                        clicked={editDateHandler}
                        title={'Edit date'}
                        type={'edit'}
                        size={16}
                    />
                </CSSTransition>
            </Row>
            <DateContainer
                editing={editingDate}
                clickedCancel={() => setEditingDate(false)}
            />
            <Row
                onMouseEnter={() => setIsTagEditShown(true)}
                onMouseLeave={() => setIsTagEditShown(false)}
            >
                <Description>Tag:</Description>
                <Value>Tag will be placed here</Value>
                <CSSTransition
                    in={isTagEditShown}
                    timeout={500}
                    classNames="move"
                    mountOnEnter
                    unmountOnExit
                >
                    <EditButton
                        clicked={editTagHandler}
                        title={'Edit tasks tag'}
                        type={'edit'}
                        size={16}
                    />
                </CSSTransition>
            </Row>
            <Tag
                editing={editingTag}
                clickedCancel={() => setEditingTag(false)}
            />
            <Row
                onMouseEnter={() => setIsNotesEditShown(true)}
                onMouseLeave={() => setIsNotesEditShown(false)}
            >
                <Description>Notes:</Description>
                <CSSTransition
                    in={isNotesEditShown}
                    timeout={500}
                    classNames="move"
                    mountOnEnter
                    unmountOnExit
                >
                    <EditButton
                        clicked={editNotesHandler}
                        title={'Add new note'}
                        type={'add'}
                        size={16}
                    />
                </CSSTransition>
            </Row>
            <Notes
                editing={editingNotes}
                clickedCancel={() => setEditingNotes(false)}
            />
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
    };
}) => {
    return {
        selectedItem: state.list.selectedItem
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    selected: boolean;
    showingPlaceholder: boolean;
};

export default connector(React.memo(Details));
