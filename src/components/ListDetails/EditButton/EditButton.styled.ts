import styled from 'styled-components';

interface ButtonProps {
    readonly type: string;
    readonly size: number;
    readonly mobile: boolean;
    readonly where?: boolean;
}

export const Button = styled.div<ButtonProps>`
    width: 2.6rem;
    height: 2.6rem;
    margin: -0.2rem 1rem;
    border-radius: 50%;
    background-color: #3f72af;
    grid-column: ${(props) =>
        props.type === 'edit'
            ? props.where
                ? '4 / 5'
                : '3 / 4'
            : props.type === 'add'
            ? '3 / 4'
            : '2 / 3'};
    grid-row: 1 / 2;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    z-index: 100;
    ${(props) => (props.type === 'delete' ? 'z-index: 5;' : null)};

    &:hover {
        background-color: #366296;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
        transform: translateY(-0.2rem);
    }
`;
