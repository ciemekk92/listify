import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from './EditButton.styled';
import { Cancel, Confirm, Edit, Delete } from '../../Icons';

type ButtonProps = {
    clicked(arg0: any): void;
    title: string;
    type: string;
    size: number;
    mobile: boolean;
};

const EditButton: React.FC<Props> = (props) => {
    const { clicked, title, type, size, mobile } = props;

    const editButton = (
        <Edit title={title} color={'#fff'} size={size} mobile={mobile} />
    );
    const confirmButton = (
        <Confirm title={title} color={'#fff'} size={size} mobile={mobile} />
    );
    const cancelButton = (
        <Cancel title={title} color={'#fff'} size={size} mobile={mobile} />
    );
    const deleteButton = (
        <Delete title={title} color={'#fff'} size={size} mobile={mobile} />
    );

    return (
        <Button type={type} onClick={clicked} size={size} mobile={mobile}>
            {type === 'edit'
                ? editButton
                : type === 'confirm'
                ? confirmButton
                : type === 'delete'
                ? deleteButton
                : cancelButton}
        </Button>
    );
};

const mapStateToProps = (state: {
    user: {
        mobile: boolean;
    };
}) => {
    return {
        mobile: state.user.mobile
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & ButtonProps;

export default connector(React.memo(EditButton));
