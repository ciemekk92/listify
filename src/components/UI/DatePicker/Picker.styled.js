import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;

    & > div {
        padding: 10px 20px;
    }

    & > div:nth-child(1) {
        border-right: 1px solid black;
        background-color: #ffaaa5;
        color: #000000;
        border-radius: 5px;
    }
`;
