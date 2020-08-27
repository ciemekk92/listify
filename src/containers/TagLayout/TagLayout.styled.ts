import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface LayoutProps {
    readonly selected?: boolean;
    readonly adding?: boolean;
}

export const Wrapper = styled.div<LayoutProps>`
    width: 100%;
    background-color: #f9f7f7;
    color: black;
    overflow: hidden;
    grid-column: 1 / 3;
    z-index: 0;
    align-self: start;

    @media only screen and ${device.tablet} {
        margin: 1%;
        width: 80%;
        overflow: auto;
    }
`;
