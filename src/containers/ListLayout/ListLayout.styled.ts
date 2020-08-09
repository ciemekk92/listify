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
    grid-template-rows: 0.2fr 0.2fr 0.3fr 0.3fr 3fr;
    grid-template-areas: 'warning' 'input' 'submit' 'date' 'list';
    align-items: center;
    flex-direction: column;
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
    height: 90%;
    margin: 1% auto auto auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    color: black;
    grid-area: list;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Warning = styled.div`
    place-self: center;
    grid-area: warning;
    text-align: center;
    color: red;
    font-size: 1.4rem;
`;
