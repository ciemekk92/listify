import React from 'react';
import { StyledBurger } from './Burger.styled';

type BurgerProps = {
    setOpen(): void;
    open: boolean;
};

const Burger: React.FC<BurgerProps> = (props) => {
    const { setOpen, open } = props;
    return (
        <StyledBurger onClick={setOpen} open={open}>
            <div />
            <div />
            <div />
        </StyledBurger>
    );
};

export default Burger;
