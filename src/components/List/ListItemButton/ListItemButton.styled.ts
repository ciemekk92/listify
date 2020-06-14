import styled from 'styled-components';

interface ButtonProps {
    readonly type: string;
}

export const Button = styled.div<ButtonProps>`
    min-width: 24px;
    min-height: 24px;
    border-radius: 50%;
    background-color: #ff9650;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-column-start: ${(props) => (props.type === 'complete' ? 3 : 4)};
    grid-column-end: auto;
    place-self: center;
    transition: all 0.3s ease;
    z-index: 2;

    &:hover {
        background-color: #ff771d;
    }
`;
