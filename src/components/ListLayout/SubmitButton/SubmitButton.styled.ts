import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

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

    @media only screen and ${device.laptop} {
        font-size: 1rem;
    }

    @media only screen and ${device.tablet} {
        width: 50%;
        margin-bottom: 0.4rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.8rem;
        margin-bottom: 0;
    }

    &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
    }
`;
