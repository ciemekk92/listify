import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface LayoutProps {
    readonly selected: boolean;
}

export const Wrapper = styled.div<LayoutProps>`
    width: 45%;
    height: 85vh;
    background-color: #f9f7f7;
    color: black;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, max-content) 1fr;
    row-gap: 1rem;
    align-items: center;
    justify-items: center;
    overflow: hidden;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 0;
    border-radius: 30px;

    @media only screen and ${device.tablet} {
        margin: 1%;
        width: 80%;
        overflow: auto;
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
    grid-row: 6 / -1;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Warning = styled.div`
    place-self: center;
    grid-row: 5 / 6;
    text-align: center;
    color: red;
    font-size: 1.4rem;
`;
