import styled, { keyframes } from 'styled-components';
import { device } from '../MediaQueries/MediaQueries';

interface LayoutProps {
    readonly loggedIn: boolean;
}

export const Wrapper = styled.div<LayoutProps>`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #e7ecf4;
    ${(props) =>
        props.loggedIn
            ? "display: grid;\n    grid-template-rows: 10vh;\n    grid-template-areas: 'header';"
            : null}
`;

export const Header = styled.div<LayoutProps>`
    width: 100%;
    display: grid;
    grid-template-rows: ${(props) => (props.loggedIn ? '10vh' : '3fr 7fr')};
    grid-template-columns: 15% auto 10% 10%;
    grid-template-areas: ${(props) =>
        props.loggedIn
            ? "'. . . login' '. logo . .'"
            : "'. . login login' '. logo . .'"};
    grid-area: header;
    background-color: ${(props) =>
        props.loggedIn ? '#f2f5fa' : 'transparent'};
    box-shadow: ${(props) =>
        props.loggedIn ? '0 0.3rem 2rem rgba(0, 0, 0, 0.2)' : null};
    z-index: 10;

    @media only screen and ${device.laptop} {
        grid-template-columns: 20% auto 20% 20%;
        grid-template-areas: '. . login login' 'logo logo logo logo';
        row-gap: 10%;
    }

    @media only screen and ${device.tablet} {
        row-gap: 15%;
    }
`;

const moveInBottom = keyframes`
  0% {
        opacity: 0;
        transform: translateY(3rem);
    }

    100% {
        opacity: 1;
        transform: translate(0);
    }
`;

export const Logo = styled.div`
    grid-area: logo;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${moveInBottom} 1s ease-out;

    & > img {
        width: 30%;

        @media only screen and ${device.mobileL} {
            width: 50%;
        }
    }
`;

export const HeaderLogo = styled.div`
    grid-area: logo;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    place-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    & > img {
        padding: 2rem;
        width: 100%;
    }
`;

export const MainNotLoggedIn = styled.main`
    width: 100%;
    display: grid;
    height: max-content;
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 8.5fr;
    gap: 1px 1px;
    grid-template-areas: 'header' 'main';
`;

export const MainLoggedIn = styled.main<LayoutProps>`
    min-height: 90vh;
    width: 85%;
    margin-left: 15%;
    height: 90vh;
    background-color: #dbe2ef;
    display: flex;
    flex-direction: column;

    @media only screen and ${device.tablet} {
        width: 100%;
        margin: 0;
    }
`;

export const LoginContainer = styled.div`
    width: 100%;
    grid-area: login;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
