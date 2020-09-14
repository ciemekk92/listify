import styled from 'styled-components';

export const NewList = styled.div`
    width: 100%;
    background-color: #3f72af;
    height: 3.6rem;
    padding: 0.5rem 0;
    grid-row: 5 / 6;
    display: flex;
    transition: all 0.4s ease;
    flex-shrink: 1;
    margin-top: auto;
    font-size: 1.6rem;
    text-transform: uppercase;
    justify-content: start;
    align-items: center;
    font-weight: 700;
    color: #fff;
    cursor: pointer;

    & > p {
        margin-left: 0.8rem;
    }

    &:hover {
        background-color: #366296;
    }
`;
