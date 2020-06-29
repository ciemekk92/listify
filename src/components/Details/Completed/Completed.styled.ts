import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 10%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 0.15fr 1fr;
    grid-template-areas: 'label . .' 'button button button';
`;
