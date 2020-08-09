import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Input = styled.input`
    background-color: transparent;
    width: 50%;
    height: 3rem;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    text-align: center;
    grid-area: input;
    place-self: center;
    border: none;
    border-bottom: 2px solid #3f72af;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
        // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
        transform: translateY(-0.2rem);
    }

    @media only screen and ${device.laptop} {
        font-size: 1.6rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1.4rem;
    }
`;
