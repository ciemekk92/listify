import styled from 'styled-components';

interface PanelProps {
    readonly active: boolean;
}

export const Panel = styled.div<PanelProps>`
    width: 100%;
    height: 3.6rem;
    display: grid;
    grid-template-columns: 1fr 15% 20%;
    grid-template-rows: 1fr;
    gap: 1px 1px;
    font-weight: ${(props) => (props.active ? '700' : '300')};
    background-color: ${(props) => (props.active ? '#112d4e' : '#8eafd6')};
    padding: 0.5rem 0;
    transition: all 0.4s ease-out;
    align-items: center;
    justify-content: center;

    &:not(:first-child) {
        border-top: 1px solid white;
        border-bottom: 1px solid white;
    }

    &:hover {
        background-color: #173d6a;
    }
`;

export const Count = styled.div`
    background-color: #dbe2ef;
    border-radius: 15rem;
    width: 2.8rem;
    height: 1.6rem;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 2 / 3;
    font-size: 1.4rem;
    font-weight: 700;
    justify-self: end;
`;

export const Name = styled.p`
    grid-column: 1 / 2;
    font-size: 1.6rem;
    cursor: pointer;
    color: white;
    margin-left: 1.4rem;
`;

export const ButtonContainer = styled.div`
    grid-column: 3 / -1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-row: 1 / auto;
`;
