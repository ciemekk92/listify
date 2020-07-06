import styled from 'styled-components';

export const Panel = styled.div`
    width: 80%;
    margin: 1% 0;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.2rem;
    background-color: #e7ebf4;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
    min-height: 10%;
    height: 10%;
    transition: all 0.4s ease;
    position: relative;
    padding: 0 2%;
    display: grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr;
    grid-template-rows: 1fr;
    gap: 1px 1px;
    grid-template-areas: '. name button';

    &:hover {
        margin: 1.5% 0;
    }

    &::after {
        position: absolute;
        border-radius: 5px;
        content: ' ';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.7);
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &:hover::after {
        opacity: 1;
    }
`;

export const Name = styled.p`
    grid-area: name;
    font-size: 1rem;
    place-self: center;
    margin: 0;
    cursor: default;
    color: black;
`;
