import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    grid-row: 3 / 4;
    display: flex;
    flex-direction: column;
    overflow: auto;
    transition: all 0.8s ease;

    &::-webkit-scrollbar {
        display: none;
    }
`;
