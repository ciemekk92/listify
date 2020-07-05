import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 20%;
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.2fr;
    grid-template-rows: 0.6fr 1fr 1fr 1fr;
    gap: 1px 1px;
    place-self: center;
    grid-template-areas: 'label . button' 'value value value' 'value value value' 'confirm confirm confirm';
    z-index: 1;
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-area: confirm;
`;

export const Input = styled.input`
    width: 80%;
    height: 1.6rem;
    border-radius: 15px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    text-align: center;
    margin: 1% auto;
    grid-area: value;
    place-self: center;

    &:focus {
        outline: none;
    }
`;

export const Value = styled.h1`
    font-family: 'Open Sans Condensed', sans-serif;
    margin: auto 3%;
    grid-area: value;
    place-self: center;
    cursor: default;
`;

export const Placeholder = styled.div`
    margin: 0;
    padding: 0;
`;
