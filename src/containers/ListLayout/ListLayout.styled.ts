import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';
import { darken } from 'polished';

interface LayoutProps {
    readonly selected?: boolean;
    readonly color?: string;
}

export const Wrapper = styled.div<LayoutProps>`
    width: 45%;
    height: 85vh;
    background-color: #f9f7f7;
    color: black;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, max-content) 1fr;
    row-gap: 1rem;
    align-items: center;
    justify-items: center;
    overflow: hidden;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 0;
    border-radius: 0.5rem;

    @media only screen and ${device.tablet} {
        margin: 1%;
        width: 80%;
        overflow: auto;
    }
`;

export const AddingTaskContainer = styled.div`
    width: calc(100% - 5rem);
    margin-left: -5rem;
    grid-row: 2 / 3;
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: repeat(5, max-content);
    align-items: center;
    justify-items: start;
    row-gap: 2rem;
    column-gap: 5rem;
`;

export const Description = styled.p`
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #666;
    font-weight: 700;
    grid-column: 1 / 2;
    justify-self: end;
`;

export const TagContainer = styled.div`
    width: 100%;
    grid-row: 4 / 5;
    grid-column: 1 / 3;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

export const TagField = styled.div<LayoutProps>`
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

    &:hover {
        background-color: ${(props) =>
            darken(0.15, props.color ? props.color : '#3f72af')};
    }
`;

export const ListContainer = styled.div`
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    color: black;
    grid-row: 3 / 4;
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
