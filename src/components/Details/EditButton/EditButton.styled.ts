import styled from 'styled-components';

interface ButtonProps {
    readonly type: string;
    readonly size: number;
    readonly mobile: boolean;
}

export const Button = styled.div<ButtonProps>`
    width: ${(props) => (props.size === 16 ? '1.5rem' : '1.6rem')};
    height: ${(props) => (props.size === 16 ? '1.5rem' : '1.6rem')};
    margin: 0 3%;
    border-radius: 50%;
    background-color: #3f72af;
    grid-area: button;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    ${(props) => (props.type === 'delete' ? 'z-index: 5;' : null)}

    &:hover {
        background-color: #366296;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
        transform: translateY(-7%);
    }
`;
