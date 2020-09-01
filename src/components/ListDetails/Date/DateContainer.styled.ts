import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface DateProps {
    readonly editing: boolean;
}

export const Wrapper = styled.div<DateProps>`
    width: 100%;
    height: 100%;
    max-height: ${(props) => (props.editing ? '7rem' : '0')};
    opacity: ${(props) => (props.editing ? '1' : '0')};
    margin: ${(props) => (!props.editing ? '-0.5rem 0' : '0')};
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease;
    overflow: hidden;
    justify-content: space-evenly;
    align-items: center;
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
