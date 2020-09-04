import React from 'react';
import { Wrapper } from './Tag.styled';

type TagProps = {
    editing: boolean;
    clickedCancel(): void;
};

const Tag: React.FC<TagProps> = (props) => {
    const { editing } = props;
    return <Wrapper editing={editing}>Tag selection will appear here</Wrapper>;
};

export default React.memo(Tag);
