import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface ButtonProps {
    readonly login: boolean;
}

export const Button = styled.button<ButtonProps>`
    width: 10rem;
    height: 3rem;
    background-color: transparent;
    border: 2px solid #3f72af;
    border-radius: 0.5rem;
    margin: 0 2%;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    transition: all 0.2s ease;
    backface-visibility: hidden;

    @media only screen and ${device.tablet} {
        width: 60%;
    }

    &:hover {
        transform: translateY(-7%);
    }
`;
