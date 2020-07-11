import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';
interface SidebarProps {
    readonly open: boolean;
}

export const Bar = styled.div<SidebarProps>`
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

    @media only screen and ${device.tablet} {
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.4s ease-out;
        transform: ${({ open }) =>
            open ? 'translateX(0)' : 'translateX(-100%)'};
        width: 100%;
        box-shadow: none;
        overflow: hidden;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const Logo = styled.div`
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

export const PanelText = styled.div`
    margin: auto 5%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    text-align: center;
`;
