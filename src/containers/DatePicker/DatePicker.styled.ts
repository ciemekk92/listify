import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface PickerProps {
    readonly details: boolean;
}

export const Wrapper = styled.div<PickerProps>`
    width: 100%;
    text-align: center;
    display: flex;
    position: relative;
    justify-content: start;
    align-items: center;
    margin: 0;
    ${(props) => (props.details ? 'place-self: center' : null)};
    height: 3rem;
    z-index: 20;
    ${(props) =>
        props.details
            ? 'grid-area: input'
            : 'grid-row: 1 / 2; grid-column: 2 / 3'};

    @media only screen and ${device.tablet} {
        height: 2rem;
    }
`;
