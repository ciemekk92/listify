import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface SidebarProps {
    readonly open: boolean;
}

export const Bar = styled.div<SidebarProps>`
    position: fixed;
    overflow: auto;
    width: 15%;
    top: 10vh;
    left: 0;
    height: 90vh;
    background-color: #cfd9ea;
    display: grid;
    grid-template-rows: max-content max-content 1fr 5%;
    z-index: 5;

    @media only screen and ${device.tablet} {
        position: absolute;
        height: 100vh;
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

export const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 5%;
`;

export const LabelPanel = styled.div`
    width: 100%;
`;

export const PanelText = styled.div`
    margin: auto 5%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    text-align: center;
`;
