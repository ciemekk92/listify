import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface DetailsProps {
    readonly selected: boolean;
}

export const Wrapper = styled.div<DetailsProps>`
    opacity: ${(props) => (props.selected ? 1 : 0)};
    width: 45%;
    height: 85vh;
    align-items: center;
    justify-content: flex-start;
    place-self: center;
    color: black;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    background-color: #f9f7f7;
    transition: all 0.4s ease;

    @media only screen and ${device.tablet} {
        margin: 1%;
    }

    & > div {
        background-color: #dbe2ef;
        border-radius: 0.5rem;
        width: 95%;
    }
`;

export const Row = styled.div`
    width: 90%;
    height: max-content;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 20% 70% 10%;
    margin: 1rem 0;
`;

export const Value = styled.p`
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #000;
    font-weight: 700;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin-left: 5rem;
    justify-self: flex-start;
`;
