import styled from 'styled-components';

export const Button = styled.button`
    width: 20rem;
    height: 3rem;
    background-color: transparent;
    border: 2px solid #3f72af;
    border-radius: 0.5rem;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    cursor: pointer;
    place-self: center;
    backface-visibility: hidden;
    transition: all 0.4s ease;

    &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
    }
`;
