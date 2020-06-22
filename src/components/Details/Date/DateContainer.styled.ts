import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 20%;
    display: grid;
    grid-template-columns: 1fr 1fr 0.2fr;
    grid-template-rows: 0.6fr 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: '. . button' 'value value value' 'input input input' 'confirm confirm confirm';
`;

export const Value = styled.h1`
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
