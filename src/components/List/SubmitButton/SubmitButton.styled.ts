import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface SubmitProps {
    readonly selected: boolean;
}

export const Button = styled.button<SubmitProps>`
    width: ${(props) => (props.selected ? '30%' : '15%')};
    height: 1.8rem;
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
        margin-bottom: 0.4rem;
    }

    @media only screen and ${device.laptop} {
        font-size: 1rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
    }

    @media only screen and ${device.mobileM} {
        font-size: 0.8rem;
        margin-bottom: 0;
    }

    &:hover {
        transform: translateY(-7%);
    }
`;
