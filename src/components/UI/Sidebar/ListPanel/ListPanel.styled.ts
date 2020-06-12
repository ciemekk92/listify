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
    background-color: ${(props) => (props.active ? '#62d2a2' : '#9df3c4')};
    padding: 1% 0;
    cursor: pointer;
    transition: all 0.6s ease;
    flex-shrink: 0;

    &:hover {
        background-color: #70eda9;
    }
`;
