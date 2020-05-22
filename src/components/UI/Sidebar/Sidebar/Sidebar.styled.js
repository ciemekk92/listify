import styled from 'styled-components';

export const Bar = styled.div`
    position: fixed;
    overflow: auto;
    width: 15%;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7);
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 85% 5%;
`;

export const LogoPlaceholder = styled.h1`
    grid-row-start: 1;
    grid-row-end: auto;
    place-self: center;
`;
