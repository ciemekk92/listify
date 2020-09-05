import styled from 'styled-components';

export const Panel = styled.div`
    width: 65%;
    margin: 0.5rem 0;
    padding: 0.5rem 0;
    position: relative;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.4rem;
    background-color: #e7ebf4;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    height: max-content;
    transition: all 0.4s ease;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 90% 10%;

    &:first-child {
        margin-top: 0.5rem;
    }

    &:hover {
        margin-bottom: 0.8rem;
    }

    &::after {
        position: absolute;
        border-radius: 0.5rem;
        content: ' ';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &:hover::after {
        opacity: 1;
    }
`;

export const Name = styled.p`
    font-size: 1.6rem;
    place-self: center;
    margin: 0.3rem 0 0 1rem;
    cursor: default;
    color: black;
    grid-column: 1 / 2;
    justify-self: start;
`;
