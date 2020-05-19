import styled from 'styled-components';

export const Button = styled.div`
    min-width: 24px;
    min-height: 24px;
    border-radius: 50%;
    background-color: #ff9650;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-column-start: ${(props) => (props.type === 'complete' ? 3 : 4)};
    grid-column-end: auto;
    place-self: center;
    transition: all 0.3s ease;

    &:hover {
        background-color: #a5a5a5;
    }
`;
