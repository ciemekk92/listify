import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CheckBoxChecked, CheckBoxEmpty } from '../../../Icons';
import { Button, Border } from './CompletedButton.styled';
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

    const notChecked = <div />;

    return (
        <Button onClick={clicked}>
            <Border>
                <CSSTransition
                    in={completed}
                    timeout={400}
                    classNames={'button'}
                >
                    {completed ? checked : notChecked}
                </CSSTransition>
            </Border>
        </Button>
    );
};

export default CompletedButton;
