import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const TextInput = styled.input`
    width: 80%;
    height: 3rem;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    text-align: center;
    border: none;
    border-bottom: 2px solid #3f72af;

    @media only screen and (min-width: 2200px) {
        height: 4rem;
        font-size: 2rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.9rem;
    }
`;
