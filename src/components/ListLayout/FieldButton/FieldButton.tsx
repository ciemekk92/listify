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
    details?: boolean;
};

const FieldButton: React.FC<ButtonProps> = (props) => {
    const { clicked, tagValue, listValue, listEnabled, details } = props;

    return (
        <Button
            listEnabled={listEnabled}
            color={tagValue ? tagValue.color : '#3f72af'}
            onClick={clicked}
            details={details}
        >
            {tagValue
                ? tagValue.name === ''
                    ? 'None'
                    : tagValue.name.length < 16
                    ? tagValue.name
                    : tagValue.name.substring(0, 16) + '...'
                : listValue
                ? listValue.length < 16
                    ? listValue
                    : listValue.substring(0, 16) + '...'
                : null}
        </Button>
    );
};

export default FieldButton;
