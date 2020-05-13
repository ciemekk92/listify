import styled from 'styled-components';

export const Item = styled.div`
    width: 85%;
    height: 10%;
    background-color: ${props => props.completed ? '#a8e6cf' : '#fdffab'};
    text-align: center;
    font-family: 'Open Sans Condensed';
    color: black;
    margin: 1% 0 0 0;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 45% 45% 5% 5%;
    cursor: default;
    box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.75);
`;

export const Date = styled.div`
    width: 70%;
    grid-column-start: 2;
    grid-column-end: auto;
    place-self: center;
`;

export const Name = styled.div`
    width: 30%;
    grid-column-start: 1;
    grid-column-end: auto;
    place-self: center;
`;