import styled from 'styled-components';

interface TagProps {
    readonly editing?: boolean;
}

export const Wrapper = styled.div<TagProps>`
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
