import React from 'react';

export const hiddenListContext = React.createContext({
    hidden: false,
    handleClick: (value: boolean) => {}
});
