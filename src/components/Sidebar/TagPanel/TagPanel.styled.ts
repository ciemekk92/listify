import styled from 'styled-components';
import { darken } from 'polished';

interface PanelProps {
    readonly active?: boolean;
    readonly color: string;
}

export const Panel = styled.div<PanelProps>`
    width: 100%;
    height: 3.6rem;
    display: grid;
    grid-template-columns: 0.2fr 0.5fr 0.3fr;
    grid-template-rows: 1fr;
    gap: 1px 1px;
    font-weight: ${(props) => (props.active ? '700' : '300')};
    background-color: #8eafd6;
    padding: 1% 0;
    transition: all 0.4s ease-out;
    align-items: center;
    justify-items: center;
    z-index: 1;

    &:not(:last-child) {
        border-bottom: 1px solid white;
    }

    &:hover {
        background-color: ${(props) => darken(0.05, '#8eafd6')};
        color: #fff;
    }
`;

export const Color = styled.div<PanelProps>`
    height: 0.5rem;
    width: 2rem;
    border-radius: 1rem;
    background-color: ${(props) => props.color};
    grid-column: 1 / 2;
    margin-left: 1rem;
`;

export const Name = styled.p`
    grid-column: 2 / 3;
    font-size: 1.6rem;
    cursor: pointer;
    color: #fff;
    z-index: 5;
`;

export const ButtonContainer = styled.div`
    grid-column: 3 / -1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-row: 1 / auto;
`;
