import React from 'react';
import { Item, Date, Name } from './ListItem.styled';
import EditButton from '../../ListDetails/EditButton/EditButton';

const ListItem = (props: {
    clicked(): void;
    clickedComplete(): void;
    clickedDelete(): void;
    completed: boolean;
    selected: boolean;
    name: string;
    date: Date;
}) => {
    const {
        clicked,
        clickedComplete,
        clickedDelete,
        completed,
        selected,
        name,
        date
    } = props;

    const completeHandler = () => {
        clickedComplete();
    };

    const deleteHandler = () => {
        clickedDelete();
    };

    return (
        <Item completed={completed} onClick={clicked} selected={selected}>
            <Name>
                {name.length < 29 ? name : name.substring(0, 28) + '...'}
            </Name>
            <Date>{date}</Date>
            {completed ? null : (
                <EditButton
                    clicked={completeHandler}
                    title={'Complete task'}
                    type={'confirm'}
                    size={16}
                    item
                />
            )}
            <EditButton
                clicked={deleteHandler}
                title={'Delete task'}
                type={'delete'}
                size={16}
                item
            />
        </Item>
    );
};

export default React.memo(ListItem);
