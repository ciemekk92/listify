import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface ButtonProps {
    readonly login: boolean;
}

export const Button = styled.button<ButtonProps>`
    width: 60%;
    height: 30px;
    background-color: transparent;
    border: 2px solid #3f72af;
    border-radius: 5px;
    margin: 0 2%;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 16px;
    transition: all 0.4s ease;
    backface-visibility: hidden;

    @media only screen and (min-width: 2200px) {
        font-size: 2rem;
        height: 50px;
    }

    @media only screen and ${device.tablet} {
        width: 60%;
    }

    &:hover {
        transform: translateY(-7%);
    }
`;
