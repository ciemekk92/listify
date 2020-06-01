import React from 'react';
import { Wrapper } from './DateContainer.styled'

const DateContainer: React.FC = (props) => {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export default DateContainer;