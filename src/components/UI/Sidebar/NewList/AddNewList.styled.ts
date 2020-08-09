import styled from 'styled-components';

export const NewList = styled.div`
    width: 100%;
    background-color: #3f72af;
    height: 4rem;
    grid-row: 5 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 1;
    margin-top: auto;

    &:hover {
        background-color: #366296;
    }
`;
