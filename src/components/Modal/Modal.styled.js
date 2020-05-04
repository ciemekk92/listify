import styled from 'styled-components';

export const Area = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 500;
    color: black;
    background-color: white;
    width: 30%;
    height: 25%;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 35%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.4s ease-out;
    transform: ${(props) =>
        props.slide ? 'translateY(0)' : 'translateY(-100vh)'};
`;
