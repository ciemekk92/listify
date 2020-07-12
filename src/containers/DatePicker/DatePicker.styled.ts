import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface PickerProps {
    readonly details: boolean;
}

export const Wrapper = styled.div<PickerProps>`
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    grid-area: date;
    place-self: center;
    height: 45px;
    z-index: 20;
    ${(props) => (props.details ? 'grid-area: input' : 'grid-area: date')};

    @media only screen and ${device.tablet} {
        height: 2rem;
    }
`;
