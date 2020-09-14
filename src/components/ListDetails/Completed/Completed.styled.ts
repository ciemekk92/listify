import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    height: max-content;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 3 / 4;

    @media only screen and ${device.mobileM} {
        margin-right: 2rem;
    }
`;
