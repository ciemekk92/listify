import React from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/Details/Name/Name';
import DateContainer from '../../components/Details/Date/DateContainer';
import Completed from '../../components/Details/Completed/Completed';
import Description from '../../components/Details/Description/Description';
import { Item } from '../../types';

const Details = (props: { selectedItem: Item }) => {
    const { selectedItem } = props;

    return (
        <Wrapper>
            <Name />
            <DateContainer>{selectedItem.date}</DateContainer>
            <Completed>{selectedItem.completed}</Completed>
            <Description>There goes description</Description>
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
