import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface LayoutProps {
    readonly selected: boolean;
}

export const Wrapper = styled.div<LayoutProps>`
    width: ${(props) => (props.selected ? '80%' : '94%')};
    margin: 0 3%;
    height: 85vh;
    background-color: #f9f7f7;
    color: black;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: ${(props) => (props.selected ? 1 : 0.000001)};
    overflow: hidden;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 0;
    border-radius: 30px;
    transition: flex-shrink 1s ease-out;

    @media only screen and ${device.tablet} {
        margin: 1%;
        width: 80%;
        overflow: auto;
    }
`;

export const ListContainer = styled.div`
    width: 85%;
    height: 60%;
    margin: 0.25rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    color: black;
    grid-row-start: 4;
    grid-row-end: auto;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Label = styled.div`
    color: black;
    width: 95%;
    font-size: 0.8rem;
    margin: 1% 0;
`;
