import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    height: max-content;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8em 1fr;
    grid-template-areas: 'label . .' 'button button button';

    @media only screen and ${device.mobileM} {
        grid-template-rows: 1em 1fr;
    }
`;
