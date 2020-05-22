import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Bar } from './Sidebar.styled';
import { LogoPlaceholder } from './Sidebar.styled';
import AddNewList from '../NewList/AddNewList';
import NewListInput from '../NewList/NewListInput/NewListInput';
import PanelContainer from '../PanelContainer/PanelContainer';
import ListPanel from '../ListPanel/ListPanel';
import SidebarModal from '../SidebarModal/SidebarModal';

const Sidebar = (props) => {
    const { lists } = props;
    const [addingList, setAddingList] = useState(false);

    const addNewListHandler = () => {
        setAddingList(false);
        props.addNew();
    };

    const toggleAdding = () => {
        setAddingList(!addingList);
    };

    //TODO map Lists to sidebar

    let listsArray = Object.keys(lists);

    return (
        <Bar>
            <SidebarModal open={addingList} modalClosed={toggleAdding} />
            <LogoPlaceholder>Listify</LogoPlaceholder>
            <PanelContainer>
                {lists
                    ? listsArray.map((element) => (
                          <ListPanel name={element} key={uuidv4()} />
                      ))
                    : null}
            </PanelContainer>
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
