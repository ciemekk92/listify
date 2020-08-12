import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Value = styled.div`
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 2rem;
    margin: auto 3%;
    grid-area: value;
    place-self: center;
    cursor: default;

    @media only screen and ${device.mobileS} {
        font-size: 1.4rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1.6rem;
        margin-bottom: 2%;
    }
`;

export const Confirm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-area: confirm;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-area: input;
    place-self: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 'input' 'confirm';

    @media only screen and ${device.mobileM} {
        grid-template-rows: 1fr 1fr;
    }
`;

export const Placeholder = styled.div`
    margin: 0;
    padding: 0;
`;
