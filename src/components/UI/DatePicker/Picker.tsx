import React from 'react';
import { Wrapper } from './Picker.styled';

const Picker = (props: { date: string; handleSelect(): void }) => {
    const { date, handleSelect } = props;

    const handleKeyPress = (event: React.KeyboardEvent) => {
        const charCode = event.charCode;
        if (charCode === 13 || charCode === 32) {
            handleSelect();
        }
    };

    return (
        <Wrapper
            tabIndex={0}
            onClick={handleSelect}
            onKeyPress={handleKeyPress}
            role="button"
            aria-label="Datepicker"
        >
            <div aria-label="Selected date">{date}</div>
        </Wrapper>
    );
};

export default Picker;
