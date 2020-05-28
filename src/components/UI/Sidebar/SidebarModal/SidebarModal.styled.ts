import styled from 'styled-components';

interface ModalProps {
    readonly slide: boolean;
}

export const Area = styled.div<ModalProps>`
    width: 14%;
    height: 16%;
    background-color: #fff;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: black;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.6);
    padding: 8px;
    left: 0.5%;
    top: 78%;
    box-sizing: border-box;
    transition: all 0.4s ease-out;
    transform: ${(props) =>
        props.slide ? 'translateY(0)' : 'translateY(100vh)'};
`;
