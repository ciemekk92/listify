import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    height: 90%;
    background-color: #fff2e9;
    border-radius: 15px;
    place-self: center;
    color: black;
    display: grid;
    grid-template-columns: 0.6fr 1.4fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: 'name description' 'date description' 'completed description';
    overflow: hidden;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    z-index: 0;
`;
