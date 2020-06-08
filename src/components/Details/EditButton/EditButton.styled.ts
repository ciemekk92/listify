import styled from 'styled-components';

export const Button = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 3%;
    border-radius: 50%;
    background-color: #ff9650;
    grid-area: button;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;

    &:hover {
        background-color: #ff771d;
    }
`;
