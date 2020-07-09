import styled from 'styled-components';
import { device } from '../../../../templates/MediaQueries/MediaQueries';

export const StyledBurger = styled.button`
    position: absolute;
    top: 3%;
    left: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 105;

    &:focus {
        outline: none;
    }

    div {
        width: 2rem;
        height: 0.25rem;
        background-color: #112d4e;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
    }
`;
