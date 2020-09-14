import React from 'react';

export const burgerContext = React.createContext({
    openSidebar: false,
    handleSidebarOpen: () => {}
});
