import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 20%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8rem 3fr;
    gap: 1px 1px;
    place-self: center;
    grid-template-areas: 'label . button' 'value value value';
    z-index: 1;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: value;
    place-self: center;
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input`
    width: 80%;
    height: 1.6rem;
    border-radius: 15px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    text-align: center;
    margin: 2% 0;
    place-self: center;

    &:focus {
        outline: none;
    }
`;

export const Value = styled.h1`
    font-family: 'Open Sans Condensed', sans-serif;
    place-self: center;
    cursor: default;
    grid-area: value;
`;

export const Placeholder = styled.div`
    margin: 0;
    padding: 0;
`;
