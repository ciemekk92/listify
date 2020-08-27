import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';
import { darken } from 'polished';

interface LayoutProps {
    readonly selected?: boolean;
    readonly color?: string;
    readonly adding?: boolean;
}

interface AddingProps {
    readonly list?: boolean;
}

export const Wrapper = styled.div<LayoutProps>`
    width: 100%;
    background-color: #f9f7f7;
    color: black;
    overflow: hidden;
    grid-column: 1 / 3;
    z-index: 0;
    align-self: start;

    @media only screen and ${device.tablet} {
        margin: 1%;
        width: 80%;
        overflow: auto;
    }
`;

export const AddingTaskToggle = styled.button`
    width: 3.6rem;
    height: 3.6rem;
    margin-right: 3rem;
    background-color: #3f72af;
    border: none;
    border-radius: 50%;
    color: black;
    outline: none;
    cursor: pointer;
    backface-visibility: hidden;
    justify-self: center;
    transition: all 0.4s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
    }
`;

export const AddingTaskContainer = styled.div<LayoutProps>`
    width: calc(100% - 5rem);
    margin-left: -5rem;
    padding: ${(props) => (props.adding ? '1.5rem' : '0')};
    display: flex;
    height: max-content;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    transition: all 0.4s ease;
    max-height: ${(props) => (props.adding ? '35rem' : '0')};
    opacity: ${(props) => (props.adding ? '1' : '0')};
    overflow: hidden;
`;

export const Description = styled.p`
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #666;
    font-weight: 700;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    justify-self: end;
`;

export const FieldContainer = styled.div<AddingProps>`
    width: 100%;
    grid-row: ${(props) => (props.list ? '4 / 5' : '5 / 6')};
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

export const Field = styled.div<LayoutProps>`
    background-color: ${(props) => (props.color ? props.color : '#3f72af')};
    color: ${(props) =>
        props.color === '#FFEB3B' || props.color === '#FFC107'
            ? '#666'
            : '#fff'};
    font-size: 1.5rem;
    padding: 0.2rem 0.6rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.5rem;

    &:hover {
        background-color: ${(props) =>
            darken(0.15, props.color ? props.color : '#3f72af')};
    }
`;

export const ListContainer = styled.div<LayoutProps>`
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Warning = styled.div`
    place-self: center;
    grid-row: 6 / 7;
    grid-column: 1 / 3;
    text-align: center;
    color: red;
    font-size: 1.4rem;
`;
