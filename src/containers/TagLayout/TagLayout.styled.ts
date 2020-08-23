import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    width: 100%;
    height: 85vh;
    background-color: #f9f7f7;
    color: black;
    display: grid;
    grid-template-rows: repeat(2, max-content) 1fr;
    row-gap: 1rem;
    align-items: center;
    justify-items: center;
    overflow: hidden;
    z-index: 0;
    border-radius: 0.5rem;
    grid-column: 1 / 3;

    @media only screen and ${device.tablet} {
        margin: 1%;
        width: 80%;
        overflow: auto;
    }
`;
