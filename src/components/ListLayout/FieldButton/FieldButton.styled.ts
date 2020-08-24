import styled from 'styled-components';

interface ButtonProps {
    readonly color: string;
    readonly list?: boolean;
}

export const Button = styled.button<ButtonProps>`
    font-size: 1.6rem;
    grid-row: ${(props) => (props.list ? '3 / 4' : '4 / 5')};
    grid-column: 2 / 3;
    padding: 0.3rem 2.5rem;
    background-color: ${(props) =>
        props.color === '' ? '#3f72af' : props.color};
    border: 1px solid #666;
    color: ${(props) =>
        props.color === '#FFEB3B' || props.color === '#FFC107'
            ? '#666'
            : '#fff'};
    border-radius: 0.3rem;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
    font-family: 'Open Sans Condensed', sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    &:hover {
        transform: translateY(-0.2rem);
    }
`;
