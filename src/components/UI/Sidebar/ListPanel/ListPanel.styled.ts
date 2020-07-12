import styled from 'styled-components';

interface PanelProps {
    readonly active: boolean;
}

export const Panel = styled.div<PanelProps>`
    width: 100%;
    height: 2rem;
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr;
    grid-template-rows: 1fr;
    gap: 1px 1px;
    grid-template-areas: '. name button';
    font-weight: ${(props) => (props.active ? '700' : '300')};
    background-color: ${(props) => (props.active ? '#112d4e' : '#3f72af')};
    padding: 1% 0;
    transition: all 0.4s ease-out;
    flex-shrink: 0;
    border-bottom: 1px solid white;

    &:hover {
        background-color: #366296;
    }
`;

export const Name = styled.p`
    grid-area: name;
    font-size: 1rem;
    place-self: center;
    margin: 0;
    cursor: default;
    color: white;
`;

export const ButtonContainer = styled.div`
    grid-area: button;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
