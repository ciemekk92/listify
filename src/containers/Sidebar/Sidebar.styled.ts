import styled from 'styled-components';

export const Bar = styled.div`
    position: fixed;
    overflow: auto;
    width: 15%;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #cfd9ea;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 85% 5%;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 100;
`;

export const LogoPlaceholder = styled.h1`
    grid-row-start: 1;
    grid-row-end: auto;
    place-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;
