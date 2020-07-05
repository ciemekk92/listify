import styled from 'styled-components';

export const Button = styled.div`
    width: 5vh;
    height: 5vh;
    margin-bottom: 2%;
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

    &:hover {
        background-color: #366296;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
        transform: translateY(-5%);
    }
`;

export const Border = styled.div`
    width: 2.5vh;
    height: 2.5vh;
    border: 0.2vh solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15%;
`;
