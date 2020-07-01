import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    height: 95%;
    align-items: center;
    justify-content: center;
    place-self: center;
    color: black;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 0;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    border-radius: 30px;
    background-color: #f9f7f7;

    & > div {
        background-color: #dbe2ef;
        border-radius: 30px;
        width: 95%;
        margin: 1% 0;
        padding: 1% 0;
    }
`;
