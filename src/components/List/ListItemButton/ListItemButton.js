import React from 'react';
import { Button } from './ListItemButton.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './ListItemButton.css';

const ListItemButton = (props) => {
    const { clicked, complete } = props;
    return (
        <Button type={complete ? 'complete' : 'delete'} onClick={clicked}>
            <FontAwesomeIcon
                className={'icon'}
                icon={complete ? faCheck : faTimes}
                color={'white'}
                size={'xs'}
            />
        </Button>
    );
};

export default ListItemButton;
