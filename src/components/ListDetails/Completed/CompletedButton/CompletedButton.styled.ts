import styled from 'styled-components';

export const Button = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    place-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-0.3rem);
    }
`;

export const Border = styled.div`
    width: 3.2rem;
    height: 3.2rem;
    border: 0.2rem solid #666;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15%;
    transition: all 0.4s ease;
`;
