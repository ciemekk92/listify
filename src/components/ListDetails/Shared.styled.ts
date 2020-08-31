import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    height: max-content;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8em 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: 'label . button' 'value value value' 'input input input' 'confirm confirm confirm';

    @media only screen and ${device.mobileM} {
        grid-template-rows: 1em 1fr 1fr 1fr;
    }
`;
