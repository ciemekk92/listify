import styled from 'styled-components';

export const Button = styled.button`
    width: 10%;
    height: 50%;
    background-color: transparent;
    border: 2px solid #b83b5e;
    border-radius: 5px;
    margin: 0;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed';
    font-size: 12px;
    grid-row-start: 2;
    grid-row-end: auto;
    place-self: center;
    transition: all 0.2s ease-in;

    &:hover {
        font-size: 18px;
        width: 12%;
        height: 55%;
    }
`;
