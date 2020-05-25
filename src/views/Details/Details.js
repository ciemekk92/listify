import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Wrapper } from './Details.styled';
import Name from '../../components/Details/Name/Name';

const Details = (props) => {
    const { selectedItem } = props;
    const [item, setItem] = useState();

    return (
        <Wrapper>
            <Name>{selectedItem.value}</Name>
        </Wrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedItem: state.list.selectedItem
    };
};

export default connect(mapStateToProps)(Details);
