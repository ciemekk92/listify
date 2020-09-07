import styled from 'styled-components';

interface ListProps {
    readonly editing?: boolean;
}

export const Wrapper = styled.div<ListProps>`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    overflow: hidden;
    justify-content: space-evenly;
    align-items: center;
`;
