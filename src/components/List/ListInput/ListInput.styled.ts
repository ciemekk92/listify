import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Input = styled.input`
    width: 80%;
    height: 1.7rem;
    border-radius: 10px;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    text-align: center;
    grid-area: input;
    place-self: center;

    @media only screen and ${device.laptop} {
        font-size: 1rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 0.8rem;
    }
`;
