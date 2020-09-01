import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface NameProps {
    readonly editing: boolean;
}

export const Wrapper = styled.div<NameProps>`
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
`;

export const Warning = styled.div`
    place-self: center;
    text-align: center;
    color: red;
    font-size: 0.8rem;
`;

export const Input = styled.input`
    background-color: transparent;
    width: 50%;
    height: 3rem;
    outline: none;
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 1.6rem;
    text-align: center;
    border: none;
    border-bottom: 2px solid #3f72af;
    transition: all 0.4s ease;

    &:hover,
    &:focus {
        transform: translateY(-0.2rem);
    }

    @media only screen and ${device.laptop} {
        font-size: 1.6rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1.4rem;
    }
`;

export const Value = styled.div`
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 2rem;
    place-self: center;
    cursor: default;
    margin-bottom: 1rem;
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    @media only screen and ${device.mobileS} {
        font-size: 1.4rem;
    }

    @media only screen and ${device.mobileL} {
        font-size: 1.6rem;
        margin-bottom: 2%;
    }
`;

export const Placeholder = styled.div`
    margin: 0;
    padding: 0;
`;
