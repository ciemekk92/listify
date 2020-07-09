import React from 'react';
import { StyledBurger } from './Burger.styled';

type BurgerProps = {
    setOpen(): void;
};

const Burger: React.FC<BurgerProps> = (props) => {
    const { setOpen } = props;
    return (
        <StyledBurger onClick={setOpen}>
            <div />
            <div />
            <div />
        </StyledBurger>
    );
};

export default Burger;
