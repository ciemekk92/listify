import styled from 'styled-components';

interface TypographyProps {
    readonly color?: string;
    readonly toLeft?: boolean;
}

export const Heading2 = styled.h2<TypographyProps>`
    font-size: 2.6rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: ${(props) =>
        props.toLeft ? '1.5rem auto 1.5rem 0.4rem' : '1.5rem 0 1.5rem 3rem'};
    cursor: default;
    color: #112d4e;
    ${(props) =>
        props.color !== '' ? 'border-bottom: 3px solid ' + props.color : null};
    align-self: start;
`;

export const Heading3 = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 1.2rem auto 1.2rem 2.4rem;
    cursor: default;
    color: #112d4e;
`;
