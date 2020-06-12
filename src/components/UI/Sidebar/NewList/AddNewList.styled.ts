import styled from 'styled-components';

export const NewList = styled.div`
    width: 100%;
    background-color: #9df3c4;
    height: 100%;
    grid-row-start: 3;
    grid-row-end: auto;
    grid-column-start: 1;
    grid-column-end: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;

    &:hover {
        background-color: #62d2a2;
    }
`;
