import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface ModalProps {
    readonly slide: boolean;
}

export const Area = styled.div<ModalProps>`
    font-size: 1.8rem;
    width: 14%;
    height: 16%;
    background-color: #fff;
    position: fixed;
    display: flex;
    flex-direction: column;
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
    top: 78%;
    box-sizing: border-box;
    transition: all 0.2s ease-out;
    transform: ${(props) =>
        props.slide ? 'translateY(0)' : 'translateY(100vh)'};

    @media only screen and ${device.tablet} {
        width: 50%;
        height: 25%;
        top: 40%;
        left: 25%;
    }
`;

export const Warning = styled.div`
    color: red;
    font-size: 1.8rem;
    text-align: center;
`;
