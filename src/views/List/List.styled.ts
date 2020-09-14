import styled from 'styled-components';

interface RowProps {
    readonly active?: boolean;
    readonly noMargin?: boolean;
    readonly shown?: boolean;
}

export const Wrapper = styled.div`
    display: flex;
    min-height: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    @media only screen and (max-width: 56.25em) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const ListWrapper = styled.div`
    width: 45%;
    height: 85vh;
    margin-left: 4rem;
    background-color: #f9f7f7;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 0;
    border-radius: 0.5rem;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 56.25em) {
        margin: 2rem 1rem 1rem 1rem;
        width: 80%;
        overflow: auto;
        height: 100%;
    }
`;

export const Row = styled.div<RowProps>`
    width: 100%;
    height: max-content;
    display: ${(props) => (props.shown ? 'none' : 'flex')};
    justify-content: space-between;
    align-items: center;
    margin: ${(props) => (props.noMargin ? '0' : '1rem 0')};
`;

export const AddingRow = styled.div<RowProps>`
    width: 100%;
    height: max-content;
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 1fr;
    align-items: center;
    margin: 0.5rem 0;
    column-gap: 5rem;
`;

export const Placeholder = styled.div`
    text-align: center;
    font-size: 3rem;
    margin: 10rem auto 0 auto;
`;

export const PlaceholderList = styled.div`
    width: 45%;
    height: 0;
    opacity: 0;
    z-index: 1000;
    position: relative;
`;
