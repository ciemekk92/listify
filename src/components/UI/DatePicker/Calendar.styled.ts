import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    width: 30rem;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 475px) {
        width: 25rem;
    }

    @media only screen and (max-width: 350px) {
        width: 22.5rem;
    }
`;
export const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.6rem;
    background-color: #3f72af;
    padding: 1rem 0;
    border-radius: 0.3rem 0.3rem 0 0;
    outline: none;
    cursor: default;
`;
export const Icons = styled.div`
    display: flex;
    flex-direction: row;
`;
export const IconContainer = styled.div`
    padding: 0 1rem;
    cursor: pointer;
    outline: none;
`;
export const Month = styled.div`
    padding: 0 1.5rem;
    background-color: #3f72af;
    color: white;
`;
export const Header = styled.th`
    height: 3rem;
`;

export const Abbreviation = styled.abbr`
    text-decoration: none;
    cursor: default;
`;
