import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    grid-row-start: 2;
    grid-row-end: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;

    & > div:last-child {
        border-bottom: 1px solid #b4b4b4;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;
