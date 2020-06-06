import styled from 'styled-components';

interface PanelProps {
    readonly active: boolean;
}

export const Panel = styled.div<PanelProps>`
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${(props) => (props.active ? '700' : '300')};
    background-color: ${(props) => (props.active ? '#fdffab' : '#fff')};
    padding: 1% 0;
    cursor: pointer;
    transition: all 0.6s ease;
    border-width: 1px 0 0 0;
    border-color: #b4b4b4;
    border-style: solid;
    flex-shrink: 0;

    &:hover {
        background-color: #fdffab;
    }
`;