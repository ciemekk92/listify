import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    width: 80%;
    height: max-content;
    padding: 2rem;
    position: relative;
    background-color: white;
    color: black;
    border-radius: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-area: main;
    place-self: center;
    margin: 1rem 0;

    @media only screen and ${device.mobileL} {
        width: 90%;
    }
`;

export const Paragraph = styled.p`
    text-align: left;
    font-size: 2.2rem;
    margin: 1rem 2rem;
`;

export const Heading3 = styled.h3`
    font-size: 3.2rem;
    margin: 1rem 2rem;
`;

export const UnorderedList = styled.ul`
    list-style: circle;
    text-align: left;
    padding-left: 3rem;
`;

export const OrderedList = styled.ol`
    list-style: upper-roman;
    font-size: 2rem;
    padding-left: 2rem;
`;

export const ListItem = styled.li`
    font-size: 2.2rem;
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
`;

export const StartContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 70% 30%;
    grid-template-areas: 'start image';
`;

export const Text = styled.div`
    grid-area: start;
    margin-left: 1rem;
`;
