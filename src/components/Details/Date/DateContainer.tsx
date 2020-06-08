import React from 'react';
import { Wrapper } from './DateContainer.styled';

const DateContainer: React.FC = (props) => {
    return (
        <Wrapper>
            <h1>{props.children}</h1>
        </Wrapper>
    );
};

export default DateContainer;
