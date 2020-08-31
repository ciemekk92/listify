import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Value, Wrapper } from './ListDetails.styled';
import Name from '../../components/ListDetails/Name/Name';
import DateContainer from '../../components/ListDetails/Date/DateContainer';
import Completed from '../../components/ListDetails/Completed/Completed';
import Notes from '../../components/ListDetails/Notes/Notes';
import { Item } from '../../types';
import { Heading2 } from '../../components/UI/Typography/Headings/Headings.styled';
import { Row } from './ListDetails.styled';
import { Description } from '../ListLayout/ListLayout.styled';
import EditButton from '../../components/ListDetails/EditButton/EditButton';

const Details: React.FC<Props> = (props) => {
    const { selected, selectedItem } = props;

    const [item, setItem] = useState(selectedItem);

    const [editingName, setEditingName] = useState(false);
    const [editingDate, setEditingDate] = useState(false);
    const [editingCompleted, setEditingCompleted] = useState(false);
    const [editingNotes, setEditingNotes] = useState(false);
    const [editingTag, setEditingTag] = useState(false);

    const editNameHandler = () => {
        setEditingName(!editingName);
    };

    // TODO: Rework this, completely
    return (
        <Wrapper selected={selected}>
            <Heading2>Task details</Heading2>
            <Row>
                <Description>Task name:</Description>
                <Value>{selectedItem.value}</Value>
                <EditButton
                    title={'Edit task name'}
                    clicked={editNameHandler}
                    type="edit"
                    size={16}
                />
            </Row>
            <Name editing={editingName} />
            <Row>
                <Description>Date:</Description>
                <Value>{selectedItem.date}</Value>
            </Row>
            <DateContainer />
            <Row>
                <Description>Completed</Description>
                <Value>{selectedItem.completed ? '+' : '-'}</Value>
            </Row>
            <Completed />
            <Row>
                <Description>Task notes:</Description>
                <Value>
                    {selectedItem.notes.length > 0 ? 'some notes' : 'no notes'}
                </Value>
            </Row>
            <Notes />
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
type Props = PropsFromRedux & { selected: boolean };

export default connector(React.memo(Details));
