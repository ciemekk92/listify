import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    display: flex;
    min-height: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

    @media only screen and ${device.tablet} {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5%;
    }
`;

export const Placeholder = styled.div`
    text-align: center;
    font-size: 3rem;
    margin: 20% auto;
`;
