import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 20%;
    display: grid;
    grid-template-columns: 0.15fr 1fr 0.15fr;
    grid-template-rows: 1.8em 1fr 1fr 1fr;
    gap: 1px 1px;
    grid-template-areas: 'label . button' 'value value value' 'input input input' 'confirm confirm confirm';
    z-index: 1;
`;

export const Label = styled.div`
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 0.8rem;
    font-style: oblique;
    grid-area: label;
    cursor: default;
    margin: auto 0 auto 15%;
`;
