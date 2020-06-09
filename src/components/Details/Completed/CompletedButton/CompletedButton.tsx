import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CheckBoxChecked, CheckBoxEmpty } from '../../../Icons';
import { Button } from './CompletedButton.styled';
import './CompletedButton.css';

type ButtonProps = {
    clicked(): void;
    completed: boolean;
};

const CompletedButton: React.FC<ButtonProps> = (props) => {
    const { clicked, completed } = props;

    const checked = (
        <CheckBoxChecked size={32} title={'Completed'} color={'#fff'} />
    );

    const notChecked = (
        <CheckBoxEmpty size={32} title={'Not completed'} color={'#fff'} />
    );

    return (
        <Button onClick={clicked}>
            <CSSTransition in={completed} timeout={400} classNames={'button'}>
                {completed ? checked : notChecked}
            </CSSTransition>
        </Button>
    );
};

export default CompletedButton;
