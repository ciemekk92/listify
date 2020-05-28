import React from 'react';
import styled from 'styled-components';

interface BackdropProps {
    readonly show: boolean;
}

const View = styled.div<BackdropProps>`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 200;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${(props) => (props.show ? 1 : 0)};
    transition: all 0.4s ease-out;
`;

const Backdrop = (props: { show: boolean; clicked(): void }) => {
    const { show, clicked } = props;
    return show ? <View show onClick={clicked} /> : null;
};

export default Backdrop;
