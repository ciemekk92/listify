import styled from 'styled-components';

interface PickerProps {
    readonly details: boolean;
}

export const Wrapper = styled.div<PickerProps>`
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: ${(props) => (props.details ? '0' : '0 0 1rem 0')};
    grid-row-start: 3;
    height: 45px;
    z-index: 20;
    ${(props) => (props.details ? 'grid-area: input' : null)};
`;
