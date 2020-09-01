import styled from 'styled-components';
import { device } from '../../../../templates/MediaQueries/MediaQueries';

export const Button = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-0.3rem);
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
    width: 3.2rem;
    height: 3.2rem;
    border: 0.2rem solid #666;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15%;
    transition: all 0.4s ease;

    @media only screen and ${device.tablet} {
        width: 1em;
        height: 1em;
    }

    @media only screen and ${device.mobileL} {
        width: 0.8em;
        height: 0.8em;
    }
`;
