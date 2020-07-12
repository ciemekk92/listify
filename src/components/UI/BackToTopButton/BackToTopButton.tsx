import React from 'react';
import { ArrowUp } from '../../Icons';
import { Button } from './BackToTopButton.styled';

type ButtonProps = {
    clicked(ref: any): void;
};

const BackToTopButton: React.FC<ButtonProps> = (props) => {
    const { clicked } = props;
    return (
        <Button onClick={clicked}>
            <ArrowUp size={32} title={'Back to top'} color={'#fff'} />
        </Button>
    );
};

export default BackToTopButton;
