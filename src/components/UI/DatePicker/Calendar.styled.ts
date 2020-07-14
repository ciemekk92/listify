import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 475px) {
        width: 250px;
    }

    @media only screen and (max-width: 350px) {
        width: 225px;
    }
`;
export const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    background-color: #3f72af;
    padding: 10px 0;
    border-radius: 10px 10px 0 0;
`;
export const Icons = styled.div`
    display: flex;
    flex-direction: row;
`;
export const IconContainer = styled.div`
    padding: 0 10px;
    cursor: pointer;
`;
export const Month = styled.div`
    padding: 0 15px;
    background-color: #3f72af;
    color: white;
`;
export const Header = styled.th`
    height: 30px;
`;

export const Abbreviation = styled.abbr`
    text-decoration: none;
`;
