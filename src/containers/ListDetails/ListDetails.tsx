import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateObject } from '../../shared/utility';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/Details/Name/Name';
import DateContainer from '../../components/Details/Date/DateContainer';
import Completed from '../../components/Details/Completed/Completed';
import Description from '../../components/Details/Description/Description';
import { Item } from '../../types/Item';

const Details = (props: { selectedItem: Item }) => {
    const { selectedItem } = props;
    const [item, setItem] = useState(selectedItem);

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(item, {
            value: target.value
        });
        setItem(updatedData);
    };

    const saveEditedItem = () => {
        // TODO
    };

    // TODO Fully implement list details

    return (
        <Wrapper>
            <Name
                changed={inputChangedHandler}
                submit={saveEditedItem}
                value={selectedItem.value}
            />
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
