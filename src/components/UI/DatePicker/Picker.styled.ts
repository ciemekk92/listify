import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.4s ease;

    &:hover {
        transform: translateY(-7%);
    }

    & > div {
        padding: 10px 20px;
    }

    & > div:nth-child(1) {
        border-right: 1px solid black;
        background-color: #3f72af;
        color: white;
        z-index: 10;
    }
`;
