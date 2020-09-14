import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface ModalProps {
    readonly slide: boolean;
}

export const Area = styled.div<ModalProps>`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 500;
    color: black;
    background-color: white;
    width: 30%;
    height: 15rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 1px 1px 1px black;
    padding: 1.6rem;
    left: 35%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.4s ease-out;
    transform: ${(props) =>
        props.slide ? 'translateY(0)' : 'translateY(-100vh)'};

    @media only screen and ${device.tablet} {
        width: 80%;
        top: 35%;
        left: 10%;
    }
`;
