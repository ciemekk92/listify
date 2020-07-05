import React, { forwardRef, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './ListDetails.styled';
import Name from '../../components/Details/Name/Name';
import DateContainer from '../../components/Details/Date/DateContainer';
import Completed from '../../components/Details/Completed/Completed';
import Description from '../../components/Details/Description/Description';
import { Item } from '../../types';
import { hiddenListContext } from '../../context/hiddenListContext';

const { Provider } = hiddenListContext;

const Details = forwardRef(
    (props: { selectedItem: Item }, ref: React.Ref<HTMLDivElement>) => {
        const { selectedItem } = props;

        return (
            <Wrapper ref={ref}>
                <Name />
                <DateContainer>{selectedItem.date}</DateContainer>
                <Completed>{selectedItem.completed}</Completed>
                <Description>There goes description</Description>
            </Wrapper>
        );
    }
);

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
