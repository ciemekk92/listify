import React from 'react';
import { Button } from './FieldButton.styled';

type ButtonProps = {
    clicked(): void;
    tagValue?: {
        name: string;
        id: string;
        color: string;
    };
    listValue?: string;
    listEnabled?: boolean;
};

const FieldButton: React.FC<ButtonProps> = (props) => {
    const { clicked, tagValue, listValue, listEnabled } = props;

    return (
        <Button
            listEnabled={listEnabled}
            color={tagValue ? tagValue.color : '#3f72af'}
            onClick={clicked}
        >
            {tagValue
                ? tagValue.name === ''
                    ? 'None'
                    : tagValue.name
                : listValue}
        </Button>
    );
};

export default FieldButton;