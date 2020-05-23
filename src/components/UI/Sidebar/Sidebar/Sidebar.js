import React, { useState } from 'react';
import useDidMountEffect from '../../../../hooks/useDidMountEffect';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../../../../store/actions/index';
import { Bar } from './Sidebar.styled';
import { LogoPlaceholder } from './Sidebar.styled';
import AddNewList from '../NewList/AddNewList';
import NewListInput from '../NewList/NewListInput/NewListInput';
import PanelContainer from '../PanelContainer/PanelContainer';
import ListPanel from '../ListPanel/ListPanel';
import SidebarModal from '../SidebarModal/SidebarModal';

const Sidebar = (props) => {
    const { lists, selectedCurrentList, onSettingCurrentList } = props;
    const [addingList, setAddingList] = useState(false);

    const addNewListHandler = () => {
        setAddingList(false);
        props.addNew();
    };

    const toggleAdding = () => {
        setAddingList(!addingList);
    };

    const currentListHandler = (list) => {
        if (list) {
            onSettingCurrentList(list);
        }
    };

    let listsArray = Object.keys(lists);

    useDidMountEffect(() => {
        onSettingCurrentList(listsArray[0]);
    }, [listsArray.length]);

    return (
        <Bar>
            <SidebarModal open={addingList} modalClosed={toggleAdding}>
                <NewListInput
                    changed={props.inputChanged}
                    value={props.inputValue}
                    submit={addNewListHandler}
                />
            </SidebarModal>
            <LogoPlaceholder>Listify</LogoPlaceholder>
            <PanelContainer>
                {lists
                    ? listsArray.map((element) => (
                          <ListPanel
                              active={selectedCurrentList === element}
                              name={element}
                              key={uuidv4()}
                              clicked={() => currentListHandler(element)}
                          />
                      ))
                    : null}
            </PanelContainer>
            <AddNewList
                clicked={!addingList ? toggleAdding : addNewListHandler}
            />
        </Bar>
    );
};

const mapStateToProps = (state) => {
    return {
        lists: state.user.userInfo.lists,
        selectedCurrentList: state.list.currentList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSettingCurrentList: (list) => dispatch(actions.setCurrentList(list))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(React.memo(Sidebar));
