import styled from 'styled-components';
import { device } from '../../templates/MediaQueries/MediaQueries';

interface DetailsProps {
    readonly selected: boolean;
}

export const Wrapper = styled.div<DetailsProps>`
    opacity: ${(props) => (props.selected ? 1 : 0)};
    width: 45%;
    height: 85vh;
    align-items: center;
    justify-content: center;
    place-self: center;
    color: black;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    background-color: #f9f7f7;
    transition: all 0.4s ease;

    @media only screen and ${device.tablet} {
        margin: 1%;
    }

    & > div {
        background-color: #dbe2ef;
        border-radius: 30px;
        width: 95%;
        margin: 1% 0;
        padding: 1% 0;
    }
`;
