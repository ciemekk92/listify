import styled, { keyframes } from 'styled-components';

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
    animation: ${moveInBottom} 1s ease-out;
`;

export const Paragraph = styled.p`
    text-align: left;
    font-size: 1.4rem;
    margin: 1% 0;
`;

export const Heading3 = styled.h3`
    font-size: 1.6rem;
    margin: 1.5% 0;
`;

export const UnorderedList = styled.ul`
    list-style: circle;
    text-align: left;
    margin: 0 0 0 5%;
    padding: 0;
    font-size: 1.4rem;
`;

export const OrderedList = styled.ol`
    list-style: upper-roman;
    font-size: 1.4rem;
`;

export const ImageBox = styled.div`
    width: 10vw;
    height: 10vh;
    margin-left: 100%;
    float: right;
    grid-area: image;
    place-self: center;
`;

export const Image = styled.img`
    width: 80%;
    height: 100%;
    margin-left: 10%;
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
`;
