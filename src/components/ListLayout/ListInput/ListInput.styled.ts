import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Input = styled.input`
    background-color: transparent;
    width: 60%;
    height: 3rem;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    text-align: center;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    border: none;
    border-bottom: 2px solid #3f72af;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
        transform: translateY(-0.2rem);
    }

    @media only screen and ${device.laptop} {
        font-size: 1.6rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1.4rem;
    }
`;
