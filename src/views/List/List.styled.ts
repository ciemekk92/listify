import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    @media only screen and ${device.tablet} {
        flex-direction: column;
    }
`;
