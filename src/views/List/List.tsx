import React, { useState } from 'react';
import Sidebar from '../../containers/Sidebar/Sidebar';
import ListLayout from '../../containers/ListLayout/ListLayout';
import ListDetails from '../../containers/ListDetails/ListDetails';
import { hiddenListContext } from '../../context/hiddenListContext';
import { connect, ConnectedProps } from 'react-redux';
import { Item } from '../../types/Item';

const { Provider } = hiddenListContext;
const List: React.FC<PropsFromRedux> = (props) => {
    const { selectedItem } = props;
    const [hidden, setHidden] = useState(false);
    const handleClick = (value: boolean) => {
        setHidden(value);
    };
    return (
        <Provider value={{ hidden, handleClick }}>
            <Sidebar />
            <ListLayout />
            {selectedItem.id ? <ListDetails /> : null}
        </Provider>
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

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(List));
