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
    width: ${(props) => (props.selected ? '95%' : '90%')};
    height: 2rem;
    background-color: ${(props) =>
        props.completed
            ? props.selected
                ? '#366296'
                : '#3f72af'
            : props.selected
            ? '#b7c6e0'
            : '#cfd9ea'};
    text-align: center;
    font-family: 'Open Sans Condensed', sans-serif;
    color: ${(props) => (props.completed ? 'white' : 'black')};
    margin: ${(props) => (props.selected ? '0.5rem 0' : '0.25rem 0')};
    border-radius: 5px;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 40% 40% 10% 10%;
    cursor: default;
    box-shadow: 1px 1px ${(props) => (props.selected ? '5px' : '3px')} 0
        rgba(0, 0, 0, ${(props) => (props.selected ? '1' : '0.5')});
    z-index: 0;
    transition: all 0.4s ease;
    position: relative;

   /* &:first-child {
        margin: ${(props) => (props.selected ? '0.5% 0 1% 0' : '0.5% 0')};
    }*/

    &::after {
        position: absolute;
        border-radius: 5px;
        content: ' ';
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.4s;
    }

    &:hover::after {
        opacity: 1;
    }

    &:hover {
        background-color: ${(props) =>
            props.completed ? '#366296' : '#b7c6e0'};
        margin: 1% 0;
    }

    &:first-child:hover {
        margin: 0.5% 0 1% 0;
    }
`;

export const Date = styled.div`
    width: 70%;
    grid-column-start: 2;
    grid-column-end: auto;
    place-self: center;
`;

export const Name = styled.div`
    width: 90%;
    grid-column-start: 1;
    grid-column-end: auto;
    place-self: center;
`;
