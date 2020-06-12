import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    height: 90%;
    place-self: center;
    background-color: #d7fbe8;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 0;
    clip-path: polygon(0 7%, 100% 0, 100% 93%, 0% 100%);
`;

export const ListContainer = styled.div`
    width: 85%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    color: black;
    grid-row-start: 4;
    grid-row-end: auto;
    justify-self: center;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;
