import styled from 'styled-components';

interface ButtonProps {
    readonly login: boolean;
}

export const Button = styled.button<ButtonProps>`
    width: 80%;
    height: 30px;
    background-color: transparent;
    border: 2px solid #3f72af;
    border-radius: 5px;
    margin: 0;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 16px;
    grid-column-start: ${(props) => (props.login ? '3' : '4')};
    grid-column-end: auto;
    place-self: center;
    transition: all 0.4s ease;
    backface-visibility: hidden;

    &:hover {
        transform: translateY(-7%);
    }
`;
