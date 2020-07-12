import styled, { keyframes } from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

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

const moveInLeft = keyframes`
  0% {
        opacity: 0;
        transform: translateX(3rem);
    }

    100% {
        opacity: 1;
        transform: translate(0);
    }
`;

export const Wrapper = styled.div`
    width: 70%;
    height: 90%;
    background-color: white;
    color: black;
    border-radius: 15px;
    padding: 1%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-area: main;
    place-self: center;
`;

export const Paragraph = styled.p`
    text-align: left;
    font-size: 1.4rem;
    margin: 1% 2%;

    @media only screen and (min-width: 2200px) {
        font-size: 2rem;
    }

    @media only screen and ${device.laptop} {
        font-size: 1.3rem;
    }

    @media only screen and ${device.tablet} {
        margin: 1% 2%;
    }

    @media only screen and (max-width: 596px) {
        font-size: 1.2rem;
    }
    @media only screen and (max-width: 502px) {
        font-size: 1.1rem;
    }

    @media only screen and (max-width: 454px) {
        font-size: 1rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.95rem;
    }
`;

export const Heading3 = styled.h3`
    font-size: 1.6rem;
    margin: 1.5% 2%;

    @media only screen and (min-width: 2200px) {
        font-size: 2.2rem;
        margin: 1.5% 2%;
    }

    @media only screen and ${device.tablet} {
        font-size: 1.4rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1.3rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 1.1rem;
    }
`;

export const UnorderedList = styled.ul`
    list-style: circle;
    text-align: left;
    margin: 0 0 0 5%;
    padding: 0;

    @media only screen and ${device.tablet} {
        margin: 0 0 0 9%;
    }
`;

export const OrderedList = styled.ol`
    list-style: upper-roman;
    font-size: 1.4rem;

    @media only screen and (min-width: 2200px) {
        margin: 1.5% 2.2%;
    }

    @media only screen and (max-width: 454px) {
        font-size: 1rem;
        margin: 0;
    }
`;

export const ListItem = styled.li`
    font-size: 1.4rem;

    @media only screen and (min-width: 2200px) {
        font-size: 2rem;
    }

    @media only screen and ${device.tablet} {
        font-size: 1.3rem;
    }

    @media only screen and (max-width: 596px) {
        font-size: 1.2rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.95rem;
    }
`;

export const ImageBox = styled.div`
    grid-area: image;
    place-self: center;
    float: right;
`;

export const Image = styled.img`
    width: 60%;
    height: 80%;
    margin-left: 50%;

    @media only screen and (min-width: 2000px) {
        width: 50%;
        height: 60%;
    }
`;

export const StartContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 0.7fr 0.3fr;
    grid-template-areas: 'start image';
`;

export const Text = styled.div`
    grid-area: start;
    margin-left: 1%;
`;
