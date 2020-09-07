import styled from 'styled-components';
import { darken } from 'polished';

interface AddingProps {
    readonly list?: boolean;
}

interface LayoutProps {
    readonly color?: string;
}

export const FieldContainer = styled.div<AddingProps>`
    width: 90%;
    margin-left: 2.6rem;
    grid-row: ${(props) => (props.list ? '4 / 5' : '5 / 6')};
    grid-column: 1 / 3;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

export const Field = styled.div<LayoutProps>`
    background-color: ${(props) => (props.color ? props.color : '#3f72af')};
    color: ${(props) =>
        props.color === '#FFEB3B' || props.color === '#FFC107'
            ? '#666'
            : '#fff'};
    font-size: 1.5rem;
    padding: 0.2rem 0.6rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin: 0.5rem 0.8rem;

    &:hover {
        background-color: ${(props) =>
            darken(0.15, props.color ? props.color : '#3f72af')};
        transform: translateY(-0.2rem);
    }
`;
