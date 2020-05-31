import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const Header = styled.div`
    width: 100%;
    grid-area: header;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 20% auto 10% 10%;
`;

export const MainNotLoggedIn = styled.main``;

export const MainLoggedIn = styled.main`
    min-height: 100vh;
    width: 85%;
    margin-left: 15%;
    background: rgb(240, 138, 93);
    background: radial-gradient(
        circle,
        rgba(255, 211, 182, 1) 0%,
        rgba(255, 170, 165, 1) 100%
    );
    display: grid;
    grid-template-columns: 1.2fr 1.2fr;
    grid-template-rows: 0.4fr 1.6fr 1fr;
    gap: 1px 1px;
    grid-template-areas: 'header header' 'main-left main-right' 'main-left main-right';
`;

export const MainLeft = styled.div`
    grid-area: main-left;
`;

export const MainRight = styled.div`
    grid-area: main-right;
`;
