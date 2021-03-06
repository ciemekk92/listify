import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface ModalProps {
    readonly slide: boolean;
}

export const Area = styled.div<ModalProps>`
    font-size: 1.8rem;
    width: 14%;
    max-height: max-content;
    background-color: #fff;
    position: fixed;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: center;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: black;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
    padding: 8px;
    left: 0.5%;
    bottom: 2%;
    box-sizing: border-box;
    transition: all 0.2s ease-out;
    transform: ${(props) =>
        props.slide ? 'translateY(0)' : 'translateY(100vh)'};

    @media only screen and ${device.tablet} {
        width: 75%;
        height: max-content;
        top: 25%;
        left: 12.5%;
    }
`;

export const Warning = styled.div`
    color: red;
    font-size: 1.8rem;
    text-align: center;
`;
