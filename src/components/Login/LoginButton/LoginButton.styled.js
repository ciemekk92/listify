import styled from 'styled-components';

export const Button = styled.button`
    width: 80%;
    height: 30px;
    background-color: transparent;
    border: 2px solid #b83b5e;
    border-radius: 5px;
    margin: 0;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: purple;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 16px;
    grid-column-start: ${(props) => (props.login ? '3' : '4')};
    grid-column-end: auto;
    place-self: center;
    transition: all 0.25s ease-in;

    &:hover {
        font-size: 17px;
        width: 83%;
        height: 33px;
    }
`;
