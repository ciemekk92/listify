import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const TextInput = styled.input`
    width: 80%;
    height: 30px;
    outline: none;
    border-radius: 5px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    text-align: center;
    margin: 0 auto 1% auto;

    @media only screen and (min-width: 2200px) {
        height: 40px;
        font-size: 2rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.9rem;
    }
`;
