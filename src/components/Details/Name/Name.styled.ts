import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 95%;
    height: 15%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffb483;
    margin-top: 2%;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
`;

export const Display = styled.div`
    width: 80%;
    margin: 1% auto;
    background-color: wheat;
`;

export const Input = styled.input`
    width: 80%;
    height: 1.6rem;
    border-radius: 15px;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    margin: 1% auto;
`;
