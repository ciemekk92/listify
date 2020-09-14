import styled from 'styled-components';

export const Button = styled.div`
    width: 5vh;
    height: 5vh;
    margin-bottom: 2%;
    border-radius: 50%;
    background-color: #112d4e;
    grid-area: button;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    cursor: pointer;
    position: fixed;
    top: 92%;
    left: 85%;
    z-index: 50;

    &:hover {
        background-color: #3f72af;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
        transform: translateY(-5%);
    }
`;
