import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Bar } from './Sidebar.styled';
import { LogoPlaceholder } from './Sidebar.styled';
import Divider from '../Divider/Divider';
import AddNewList from '../NewList/AddNewList';
import NewListInput from '../NewList/NewListInput/NewListInput';
import PanelContainer from '../PanelContainer/PanelContainer';

const Sidebar = (props) => {
    const [addingList, setAddingList] = useState(false);

    const addNewListHandler = () => {
        setAddingList(false);
        props.addNew();
    };

    const toggleAdding = () => {
        setAddingList(!addingList);
    };

    //TODO map Lists to sidebar

    return (
        <Bar>
            <LogoPlaceholder>Listify</LogoPlaceholder>
            <Divider />
            <PanelContainer />
            {addingList ? (
                <NewListInput
                    changed={props.inputChanged}
                    value={props.inputValue}
                    submit={addNewListHandler}
                />
            ) : null}
            <AddNewList
                clicked={!addingList ? toggleAdding : addNewListHandler}
            />
        </Bar>
    );
};

const mapStateToProps = (state) => {
    return {
        lists: state.user.userInfo.lists
    };
};

export default connect(mapStateToProps)(React.memo(Sidebar));
