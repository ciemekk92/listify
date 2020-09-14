import React, { forwardRef } from 'react';
import { Area, Warning } from './SidebarModal.styled';

type ModalProps = {
    open: boolean;
    warning?: string;
    ref?: React.Ref<HTMLDivElement>;
};

const SidebarModal: React.FC<ModalProps> = forwardRef(
    (props, ref: React.Ref<HTMLDivElement>) => {
        const { open, warning } = props;
        return (
            <Area slide={open} ref={ref}>
                {warning !== '' ? <Warning>{warning}</Warning> : null}
                {props.children}
            </Area>
        );
    }
);

export default SidebarModal;
