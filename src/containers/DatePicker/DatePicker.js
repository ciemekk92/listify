import React, { useState } from 'react';
import { format } from 'date-fns';
import Picker from '../../components/UI/DatePicker/Picker';
import Calendar from '../../components/UI/DatePicker/Calendar';
import { Wrapper } from './DatePicker.styled';

const DatePicker = (props) => {
    const [showDatepicker, setShowDatePicker] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const toggleCalendar = (e) => {
        setShowDatePicker(false);
        setShowCalendar(true);
    };
    const handleSelectDate = (date) => {
        setDate(date);
        setShowDatePicker(true);
        setShowCalendar(false);
    };
    const closeCalendar = () => {
        setShowDatePicker(true);
        setShowCalendar(false);
    };

    return (
        <Wrapper>
            {showDatepicker && (
                <Picker date={date} handleSelect={toggleCalendar} />
            )}
            {showCalendar && (
                <Calendar
                    date={date}
                    handleSelectDate={handleSelectDate}
                    closeCalendar={closeCalendar}
                />
            )}
        </Wrapper>
    );
};

export default DatePicker;
