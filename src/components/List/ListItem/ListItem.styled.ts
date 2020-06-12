import styled from 'styled-components';

interface ItemProps {
    readonly completed: boolean;
    readonly selected: boolean;
}

// selected & completed: #73d7b2
// selected & not completed: #fcff78
// completed: #a8e6cf
// not completed: #fdffab

export const Item = styled.div<ItemProps>`
    width: 90%;
    height: 2rem;
    background-color: ${(props) =>
        props.completed
            ? props.selected
                ? '#73d7b2'
                : '#a8e6cf'
            : props.selected
            ? '#fcff78'
            : '#fdffab'};
    text-align: center;
    font-family: 'Open Sans Condensed', sans-serif;
    color: black;
    margin: 1% 0;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 40% 40% 10% 10%;
    cursor: default;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.75);
    z-index: 0;
    transition: all 0.4s ease;

    &:hover {
        background-color: ${(props) =>
            props.completed ? '#73d7b2' : '#fcff78'};
    }
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
