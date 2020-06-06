import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateObject } from '../../shared/utility';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/Details/Name/Name';
import DateContainer from '../../components/Details/Date/DateContainer';
import Completed from '../../components/Details/Completed/Completed';
import Description from '../../components/Details/Description/Description';
import { Item } from '../../types/Item';
import { firestore } from '../../firebase/firebase';
import firebase from 'firebase';

const Details = (props: { selectedItem: Item; currentList: any }) => {
    const { selectedItem, currentList } = props;
    const [item, setItem] = useState(selectedItem);

    // TODO Fully implement list details

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
        currentList: any;
    };
}) => {
    return {
        selectedItem: state.list.selectedItem,
        currentList: state.list.currentList
    };
};

export default connect(mapStateToProps)(Details);
