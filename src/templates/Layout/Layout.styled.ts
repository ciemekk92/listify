import styled from 'styled-components';
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
    grid-template-rows: ${(props) => (props.loggedIn ? '100%' : '30% 70%')};
    grid-template-columns: 20% auto 10% 10%;
    grid-template-areas: '. . login login' '. logo . .';
`;

export const Logo = styled.div`
    width: 100%;
    height: 100%;
    grid-area: logo;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MainNotLoggedIn = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: #dbe2ef;
    grid-template-columns: 1.2fr 1.2fr;
    grid-template-rows: 0.15fr 0.85fr;
    gap: 1px 1px;
    grid-template-areas: 'header header' 'main main';
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

export const MainLeft = styled.div`
    grid-area: main-left;
`;

export const MainRight = styled.div`
    grid-area: main-right;
`;
