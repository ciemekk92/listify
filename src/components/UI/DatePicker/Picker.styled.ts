import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #666;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s ease;
    font-size: 1.6rem;

    &:hover {
        transform: translateY(-0.2rem);
    }

    & > div {
        padding: 0.3rem 2.5rem;
        background-color: #3f72af;
        color: #fff;
        z-index: 10;
    }
`;
