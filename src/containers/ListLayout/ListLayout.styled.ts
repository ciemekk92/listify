import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

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
    height: 100%;
    background-color: #f9f7f7;
    color: black;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    transition: all 0.7s ease;
`;

export const Description = styled.p`
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #8a8a8a;
    font-weight: 700;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    justify-self: end;
    padding: 0.3rem 0;
    cursor: default;
`;

export const ListContainer = styled.div<LayoutProps>`
    justify-content: center;
    width: 100%;
    max-height: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    color: black;
`;

export const Warning = styled.div`
    place-self: center;
    grid-row: 6 / 7;
    grid-column: 1 / 3;
    text-align: center;
    color: red;
    font-size: 1.4rem;
`;
