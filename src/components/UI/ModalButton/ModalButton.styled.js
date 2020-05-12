import styled from 'styled-components';

export const Button = styled.button`
    width: 30%;
    height: 75%;
    background-color: #fbf39a;
    border: 2px solid #b83b5e;
    border-radius: 5px;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed';
    font-size: 16px;
    margin: 3% 5% 0 5%;
    transition: all 0.25s ease-in;

    &:hover {
        background-color: #f7c2ab;
    }
`;
