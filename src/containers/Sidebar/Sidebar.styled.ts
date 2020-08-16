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
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    z-index: 5;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.2);

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
    height: max-content;
    width: 100%;
    font-size: 1.6rem;
    display: flex;
    justify-content: start;
    align-items: center;
    text-transform: uppercase;
    font-weight: 700;
    padding: 1rem 0;
    cursor: pointer;
    transition: all 0.2s ease;
    border-top: 1px solid #666;

    &:nth-child(3) {
        border-top: none;
    }

    &:last-child {
        border-bottom: 1px solid #666;
    }

    & > p {
        margin-left: 1rem;
    }

    & > a {
        color: #000;
        text-decoration: none;
        margin-left: 1rem;
    }

    &:hover,
    &:active {
        background-color: #b7c6e0;
    }
`;

export const PanelText = styled.div`
    margin: auto 5%;
    font-size: 1.6rem;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    text-align: center;
`;
