import styled from 'styled-components';

interface NotesProps {
    readonly editing: boolean;
}

export const Wrapper = styled.div<NotesProps>`
    height: 35%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8rem 3fr;
    gap: 1px 1px;
    grid-template-areas: 'label . button' 'value value value';
`;

export const Input = styled.input<NotesProps>`
    width: 80%;
    height: 2rem;
    border-radius: 15px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    text-align: center;
    margin-top: 5%;
    grid-area: input;
    place-self: center;
    outline: none;
`;

export const Display = styled.div`
    width: 90%;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 2rem;
    margin: 0 0 10% 0;
    grid-area: value;
    place-self: center;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 1fr 0.6fr;
    grid-area: value;
    place-self: center;
    margin-bottom: 5%;
    grid-template-areas: 'warning' 'input' 'confirm';
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-area: confirm;
    margin: 0 0 auto 0;
`;

export const Warning = styled.div`
    place-self: center;
    grid-area: warning;
    text-align: center;
    color: red;
    font-size: 0.8rem;
`;
