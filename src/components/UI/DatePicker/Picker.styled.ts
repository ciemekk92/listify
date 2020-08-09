import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-7%);
    }

    & > div {
        padding: 10px 20px;

        @media only screen and ${device.tablet} {
            padding: 5px 10px;
        }
    }

    & > div:nth-child(1) {
        border-right: 1px solid black;
        background-color: #3f72af;
        color: white;
        z-index: 10;
    }
`;
