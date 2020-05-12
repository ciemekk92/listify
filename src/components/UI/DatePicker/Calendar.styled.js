import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
`;
export const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    background-color: #00b5ad;
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
    background-color: white;
`;
export const Header = styled.th`
    height: 30px;
`;
