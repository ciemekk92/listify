import styled from 'styled-components';

export const Wrapper = styled.div`
    grid-area: name;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffb483;
`;

export const Display = styled.div`
    width: 80%;
    margin: 1% auto;
    background-color: wheat;
`

export const Input = styled.input`
    width: 80%;
    height: 1.6rem;
    border-radius: 15px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    margin: 1% auto;
`