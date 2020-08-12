import styled from 'styled-components';
import { device } from '../../../templates/MediaQueries/MediaQueries';

interface ButtonProps {
    readonly type: string;
}

export const Button = styled.div<ButtonProps>`
    min-width: 24px;
    min-height: 24px;
    border-radius: 50%;
    background-color: #112d4e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-column-start: ${(props) => (props.type === 'complete' ? 3 : 4)};
    grid-column-end: auto;
    place-self: center;
    transition: all 0.2s ease;
    z-index: 2;
    cursor: pointer;

    @media only screen and ${device.mobileL} {
        min-width: 18px;
        min-height: 18px;
    }

    &:hover {
        background-color: #1d4d86;
        transform: translateY(-7%);
    }
`;
