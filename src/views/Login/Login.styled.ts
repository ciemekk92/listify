import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media only screen and ${device.tablet} {
        flex-direction: column;
        align-items: center;
    }
`;

export const Warning = styled.div`
    color: red;
    font-size: 1.6rem;
    text-align: center;
`;
