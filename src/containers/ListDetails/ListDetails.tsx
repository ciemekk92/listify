import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/Details/Name/Name';
import { Item } from '../../types/Item'

const Details = (props: { selectedItem: { value: string } }) => {
    const { selectedItem } = props;
    const [item, setItem] = useState();

    // TODO Fully implement list details

    return (
        <Wrapper>
            <Name>{selectedItem.value}</Name>
        </Wrapper>
    );
};

const mapStateToProps = (state: {
    list: {
        selectedItem: Item
    };
}) => {
    return {
        selectedItem: state.list.selectedItem
    };
};

export default connect(mapStateToProps)(Details);
