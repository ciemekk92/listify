import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
`;

export const AddWrapper = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    justify-content: space-evenly;
    align-items: center;
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
    height: max-content;
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

export const Warning = styled.div`
    place-self: center;
    text-align: center;
    color: red;
    font-size: 0.8rem;
`;

export const Placeholder = styled.p`
    font-size: 2.4rem;
    color: #8a8a8a;
    text-align: center;
`;
