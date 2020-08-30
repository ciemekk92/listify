import styled from 'styled-components';

interface TypographyProps {
    readonly color?: string;
}

export const Heading2 = styled.h2<TypographyProps>`
    font-size: 2.6rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 1.5rem 0 1.5rem 3rem;
    cursor: default;
    color: #112d4e;
    ${(props) =>
        props.color !== '' ? 'border-bottom: 3px solid ' + props.color : null};
`;

export const Heading3 = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin: 1.2rem auto 1.2rem 2.4rem;
    cursor: default;
    color: #112d4e;
`;
