import styled from 'styled-components';

interface DateProps {
    readonly editing: boolean;
}

export const Wrapper = styled.div<DateProps>`
    width: 100%;
    height: max-content;

    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    overflow: hidden;
    justify-content: space-evenly;
    align-items: center;
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    margin: 0.5rem 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-area: confirm;
`;
