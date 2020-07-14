import React from 'react';
import { Area, Warning } from './SidebarModal.styled';
import Backdrop from '../../Backdrop/Backdrop';

type ModalProps = {
    open: boolean;
    modalClosed(): void;
    warning?: string;
};

const SidebarModal: React.FC<ModalProps> = (props) => {
    const { open, modalClosed, warning } = props;
    return (
        <>
            <Backdrop show={open} clicked={modalClosed} />
            <Area slide={open}>
                {warning !== '' ? <Warning>{warning}</Warning> : null}
                {props.children}
            </Area>
        </>
    );
};

export default SidebarModal;
