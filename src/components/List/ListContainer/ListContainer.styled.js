import styled from 'styled-components';

export const Container = styled.div`
    width: 85%;
    min-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    color: black;
    grid-row-start: 4;
    grid-row-end: auto;
    justify-self: center;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;
