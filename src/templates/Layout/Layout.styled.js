import styled from 'styled-components';

export const Header = styled.div`
    width: 100%;
    height: 5%;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 20% auto 10% 10%;
`;

export const LogoPlaceholder = styled.h1`
    grid-column-start: 2;
    grid-column-end: auto;
    place-self: center;
`;

export const Main = styled.main`
    min-height: 100vh;
    background: rgb(240, 138, 93);
    background: radial-gradient(
        circle,
        rgba(240, 138, 93, 1) 0%,
        rgba(249, 237, 105, 1) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`;
