import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    height: 20%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8em 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: 'label . button' 'value value value' 'input input input' 'confirm confirm confirm';

    @media only screen and ${device.mobileM} {
        grid-template-rows: 1em 1fr 1fr 1fr;
    }
`;

export const Label = styled.div`
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 0.8rem;
    font-style: oblique;
    grid-area: label;
    cursor: default;
    margin: auto 0 auto 15%;

    @media only screen and ${device.tablet} {
        font-size: 0.7rem;
        margin: auto 0 auto 30%;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.5rem;
    }
`;
