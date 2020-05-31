import React from 'react';
import { Area } from './SidebarModal.styled';
import Backdrop from '../../Backdrop/Backdrop';

type ModalProps = {
    open: boolean;
    modalClosed(): void;
};

const SidebarModal: React.FC<ModalProps> = (props) => {
    const { open, modalClosed } = props;
    return (
        <>
            <Backdrop show={open} clicked={modalClosed} />
            <Area slide={open}>{props.children}</Area>
        </>
    );
};

export default SidebarModal;
