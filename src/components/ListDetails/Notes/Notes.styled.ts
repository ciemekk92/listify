import styled from 'styled-components';

interface NotesProps {
    readonly editing: boolean;
}

export const Wrapper = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
`;

export const AddWrapper = styled.div<NotesProps>`
    width: 100%;
    max-height: ${(props) => (props.editing ? '15rem' : '0')};
    opacity: ${(props) => (props.editing ? '1' : '0')};
    margin: ${(props) => (!props.editing ? '-0.5rem 0' : '0')};
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    overflow: hidden;
    justify-content: space-evenly;
    align-items: center;
    height: max-content;
`;

export const Input = styled.input`
    background-color: transparent;
    width: 50%;
    height: 3rem;

    margin: 1rem 0;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    text-align: center;
    border: none;
    border-bottom: 2px solid #3f72af;
    transition: all 0.4s ease;

    &:hover,
    &:focus {
        transform: translateY(-0.2rem);
    }
`;

export const Display = styled.div`
    width: 100%;
    font-family: 'Open Sans Condensed', sans-serif;
    margin-bottom: 0.5rem;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: max-content;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-area: confirm;
    margin: 0 0 auto 0;
`;

export const Warning = styled.div`
    place-self: center;
    grid-area: warning;
    text-align: center;
    color: red;
    font-size: 0.8rem;
`;
