import React from 'react';
import { Area } from './SidebarModal.styled';
import Backdrop from '../../Backdrop/Backdrop';

const SidebarModal = (props) => {
    const { open, modalClosed } = props;
    return (
        <>
            <Backdrop show={open} clicked={modalClosed} />
            <Area slide={open}>{props.children}</Area>
        </>
    );
};

export default SidebarModal;
