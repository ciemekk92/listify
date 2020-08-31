import styled from 'styled-components';

interface ButtonProps {
    readonly type: string;
    readonly size: number;
    readonly mobile: boolean;
}

export const Button = styled.div<ButtonProps>`
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 1.5rem;
    border-radius: 50%;
    background-color: #3f72af;
    grid-column: ${(props) => (props.type === 'edit' ? '3 / 4' : '2 / 3')};
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    cursor: pointer;
    z-index: 100;
    ${(props) => (props.type === 'delete' ? 'z-index: 5;' : null)};

    &:hover {
        background-color: #366296;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
        transform: translateY(-7%);
    }
`;
