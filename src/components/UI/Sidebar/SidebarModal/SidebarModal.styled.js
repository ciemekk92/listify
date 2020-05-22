import styled from 'styled-components';

export const Area = styled.div`
    width: 14%;
    height: 16%;
    background-color: #fff;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 500;
    color: black;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 0.5%;
    top: 78%;
    box-sizing: border-box;
    transition: all 0.4s ease-out;
    transform: ${(props) =>
        props.slide ? 'translateY(0)' : 'translateY(100vh)'};
`;
