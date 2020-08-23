import React from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/ListDetails/Name/Name';
import DateContainer from '../../components/ListDetails/Date/DateContainer';
import Completed from '../../components/ListDetails/Completed/Completed';
import Notes from '../../components/ListDetails/Notes/Notes';
import { Item } from '../../types';

const Details = (props: { selectedItem: Item; selected: boolean }) => {
    const { selected } = props;
    return (
        <Wrapper selected={selected}>
            <Name />
            <DateContainer />
            <Completed />
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

export default connect(mapStateToProps)(Details);
