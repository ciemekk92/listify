import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    grid-row: 4 / 5;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;
