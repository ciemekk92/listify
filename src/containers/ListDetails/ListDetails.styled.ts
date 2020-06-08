import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    height: 100%;
    align-items: center;
    justify-content: center;
    place-self: center;
    color: black;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 0;

    & > div {
        box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    }
`;
