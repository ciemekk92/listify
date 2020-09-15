import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface DetailsProps {
    readonly selected: boolean;
    readonly showingPlaceholder: boolean;
}

interface ParagraphProps {
    readonly big?: boolean;
}

export const Wrapper = styled.div<DetailsProps>`
    width: ${(props) => (props.showingPlaceholder ? 0 : '45%')};
    opacity: ${(props) => (props.selected ? 1 : 0)};
    display: flex;
    margin-right: 4rem;
    height: 85vh;
    align-items: center;
    justify-content: flex-start;
    place-self: center;
    color: black;
    flex-direction: column;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    background-color: #f9f7f7;
    transition: opacity 0.4s ease;
    position: relative;
    z-index: 1;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 56.25em) {
        margin: 1rem 0 2rem 0;
        height: ${(props) => (props.showingPlaceholder ? 0 : 'max-content')};
        width: ${(props) => (props.showingPlaceholder ? 0 : '80%')};
    }

    & > div {
        width: 100%;
    }
`;

export const Row = styled.div`
    width: 90%;
    height: max-content;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 20% 70% 10%;
    margin: 1rem 0;
    align-items: center;

    @media only screen and ${device.tablet} {
        margin: 1.5rem 0;
    }
`;

export const RowWithCompletion = styled(Row)`
    grid-template-columns: 20% 60% 10% 10%;
`;

export const Value = styled.p<ParagraphProps>`
    font-size: ${(props) => (props.big ? '3.2rem' : '1.6rem')};
    padding: 0.3rem 0;
    text-transform: uppercase;
    color: #000;
    font-weight: 700;
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin-left: 2.4rem;
    justify-self: flex-start;
`;
