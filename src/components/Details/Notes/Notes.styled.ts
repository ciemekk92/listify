import styled from 'styled-components';

interface NotesProps {
    readonly editing: boolean;
}

export const Wrapper = styled.div`
    height: 35%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8em 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: 'label . button' 'value value value' 'value value value' 'confirm confirm confirm';
`;

export const Input = styled.input<NotesProps>`
    width: 80%;
    height: 10rem;
    border-radius: 15px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    text-align: center;
    margin: 1% auto;
    grid-area: value;
`;

export const Display = styled.ul`
    font-family: 'Open Sans Condensed', sans-serif;
    margin: auto 3%;
    grid-area: value;
    place-self: center;
    cursor: default;
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-area: confirm;
`;
