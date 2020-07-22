import React from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/Details/Name/Name';
import DateContainer from '../../components/Details/Date/DateContainer';
import Completed from '../../components/Details/Completed/Completed';
import Notes from '../../components/Details/Notes/Notes';
import { Item } from '../../types';

const Details = (props: { selectedItem: Item }) => {
    return (
        <Wrapper>
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
