import React from 'react';
import { Area } from './Modal.styled';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <>
            <Backdrop show={props.open} clicked={props.modalClosed} />
            <Area slide={props.open}>{props.children}</Area>
        </>
    );
};

export default Modal;
