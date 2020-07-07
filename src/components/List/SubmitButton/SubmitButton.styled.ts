import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Button = styled.button`
    width: 30%;
    height: 2rem;
    background-color: transparent;
    border: 2px solid #3f72af;
    border-radius: 5px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.25);
    color: black;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1rem;
    grid-area: submit;
    place-self: center;
    cursor: pointer;
    transition: all 0.4s ease;
    backface-visibility: hidden;
    margin-top: 0.5%;

    @media only screen and ${device.tablet} {
        width: 50%;
    }

    &:hover {
        transform: translateY(-7%);
    }
`;
