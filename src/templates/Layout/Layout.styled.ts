import styled, { keyframes } from 'styled-components';
import { device } from '../MediaQueries/MediaQueries';

interface LayoutProps {
    readonly loggedIn: boolean;
}

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const Header = styled.div<LayoutProps>`
    width: 100%;
    margin: 1% 0;
    display: grid;
    grid-template-rows: ${(props) => (props.loggedIn ? '100%' : '3fr 7fr')};
    grid-template-columns: 20% auto 10% 10%;
    grid-template-areas: '. . login login' '. logo . .';

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

export const MainNotLoggedIn = styled.main`
    width: 100%;
    height: 100vh;
    background-color: #dbe2ef;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 8.5fr;
    gap: 1px 1px;
    grid-template-areas: 'header' 'main';
`;

export const MainLoggedIn = styled.main<LayoutProps>`
    min-height: 100vh;
    width: 85%;
    margin-left: 15%;
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
