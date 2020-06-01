import React from 'react';
import { Wrapper } from './Completed.styled'

const Completed: React.FC = (props) => {
    return (
        <Wrapper>{props.children ? 'Completed' : 'Not completed'}</Wrapper>
    )
}

export default Completed;