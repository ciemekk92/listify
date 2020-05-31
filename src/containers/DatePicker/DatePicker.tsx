import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions/index';
import { format } from 'date-fns';
import Picker from '../../components/UI/DatePicker/Picker';
import Calendar from '../../components/UI/DatePicker/Calendar';
import { Wrapper } from './DatePicker.styled';

const DatePicker = (props: PropsFromRedux) => {
    const { onSettingDate } = props;
    const [showDatepicker, setShowDatePicker] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate]: any = useState(format(new Date(), 'yyyy-MM-dd'));

    const toggleCalendar = () => {
        setShowDatePicker(false);
        setShowCalendar(true);
    };
    const handleSelectDate = (date: Date) => {
        setDate(date);
        setShowDatePicker(true);
        setShowCalendar(false);
    };
    const closeCalendar = () => {
        setShowDatePicker(true);
        setShowCalendar(false);
    };

    useEffect(() => {
        onSettingDate(date);
    }, [date, onSettingDate]);

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

const mapDispatchToProps = {
    onSettingDate: (date: string) => actions.setSelectedDate(date)
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(DatePicker));
