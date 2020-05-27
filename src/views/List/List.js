import React, { useState } from 'react';
import Sidebar from '../../containers/Sidebar/Sidebar';
import ListLayout from '../../containers/ListLayout/ListLayout';
import ListDetails from '../../containers/ListDetails/ListDetails';
import { hiddenListContext } from '../../context/hiddenListContext';

const { Provider } = hiddenListContext;

const List = (props) => {
    const [hidden, setHidden] = useState(false);
    const handleClick = (value) => {
        setHidden(value);
    };
    return (
        <Provider value={{ hidden, handleClick }}>
            <Sidebar />
            <ListLayout />
            <ListDetails />
        </Provider>
    );
};

export default List;
