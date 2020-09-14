import styled from 'styled-components';

interface ColorProps {
    readonly value: string;
}

export const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: max-content 1fr;
    align-items: center;
    padding: 2rem 0;
    transition: all 0.4s ease;
    row-gap: 1rem;

    & > p {
        font-size: 1.4rem;
        color: #666;
        cursor: default;
        grid-row: 1 / 2;
    }
`;

export const Selector = styled.div<ColorProps>`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: ${(props) => props.value};
    border: 2px solid #666;
    transition: all 0.4s ease;
    cursor: pointer;
    grid-row: 1 / 2;

    &:hover {
        filter: brightness(90%);
        transform: translateY(-0.3rem);
    }
`;

export const Picker = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    grid-row: 2 / -1;
    grid-column: 1 / 3;
    height: max-content;
`;
export const Color = styled.div<ColorProps>`
    margin: 0.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid #666;
    background-color: ${(props) => props.value};
    transition: all 0.4s ease;

    &:hover {
        filter: brightness(90%);
        transform: translateY(-0.3rem);
    }
`;
