import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    display: flex;
    min-height: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

    @media only screen and ${device.tablet} {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5%;
    }
`;

export const ListWrapper = styled.div`
    width: 45%;
    height: 85vh;
    background-color: #f9f7f7;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
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

export const Row = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    grid-column: 1 / 3;
    align-items: center;
`;

export const AddingRow = styled.div`
    width: 100%;
    height: max-content;
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 1fr;
    margin: 1rem 0;
    column-gap: 5rem;
`;

export const Placeholder = styled.div`
    text-align: center;
    font-size: 3rem;
    grid-column: 1 / 3;
    grid-row: 2 / 4;
    margin-bottom: 15%;
`;
