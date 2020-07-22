import styled from 'styled-components';
import { device } from '../../../../templates/MediaQueries/MediaQueries';

export const Button = styled.div`
    width: 2.5em;
    height: 2.5em;
    margin-bottom: 2%;
    border-radius: 50%;
    background-color: #3f72af;
    grid-area: button;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
        background-color: #366296;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
        transform: translateY(-5%);
    }

    @media only screen and ${device.tablet} {
        width: 2em;
        height: 2em;
    }

    @media only screen and ${device.mobileL} {
        width: 1.8em;
        height: 1.8em;
    }

    @media only screen and ${device.mobileM} {
        width: 1.5em;
        height: 1.5em;
    }
`;

export const Border = styled.div`
    width: 1.4em;
    height: 1.4em;
    border: 0.2vh solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15%;

    @media only screen and ${device.tablet} {
        width: 1em;
        height: 1em;
    }

    @media only screen and ${device.mobileL} {
        width: 0.8em;
        height: 0.8em;
    }
`;
