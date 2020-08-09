import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Button = styled.button`
    width: 10rem;
    height: 3rem;
    background-color: transparent;
    border: 2px solid #3f72af;
    border-radius: 0.5rem;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    margin: 3% 5% 0 5%;
    transition: all 0.2s ease;
    backface-visibility: hidden;

    &:hover {
        transform: translateY(-7%);
    }

    @media only screen and (min-width: 2200px) {
        font-size: 3.2rem;
        height: 85%;
    }

    @media only screen and ${device.tablet} {
        width: 40%;
        font-size: 1.4rem;
    }

    @media only screen and ${device.mobileM} {
        width: 60%;
    }
`;
