import styled from 'styled-components';

interface PickerProps {
    readonly details: boolean;
    readonly calendarToggled?: boolean;
}

export const Wrapper = styled.div<PickerProps>`
    width: 100%;
    margin-top: 0.5rem;
    text-align: center;
    display: flex;
    position: relative;
    justify-content: ${(props) => (props.details ? 'center' : 'start')};
    align-items: center;
    ${(props) => (props.details ? 'place-self: center' : null)};
    height: 100%;
    max-height: ${(props) => (props.calendarToggled ? '25rem' : '5rem')};
    z-index: 20;
    ${(props) =>
        props.details
            ? 'grid-area: input'
            : 'grid-row: 1 / 2; grid-column: 2 / 3'};
    transition: all 0.4s ease;
`;
