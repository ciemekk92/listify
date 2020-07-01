import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions';
import { format } from 'date-fns';
import Picker from '../../components/UI/DatePicker/Picker';
import Calendar from '../../components/UI/DatePicker/Calendar';
import { Wrapper } from './DatePicker.styled';
import { Item } from '../../types';

const DatePicker = (props: Props) => {
    const { onSettingDate, onSettingChangedDate, type, selectedItem } = props;
    const [showDatepicker, setShowDatePicker] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate]: any = useState(
        format(
            type === 'layout' ? new Date() : new Date(selectedItem.date),
            'yyyy-MM-dd'
        )
    );

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
        if (type === 'layout') {
            onSettingDate(date);
        }
        if (type === 'details') {
            onSettingChangedDate(date);
        }
    }, [date, onSettingDate, onSettingChangedDate, type]);

    return (
        <Wrapper details={type === 'details'}>
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

const mapStateToProps = (state: {
    list: {
        selectedItem: Item;
    };
}) => {
    return { selectedItem: state.list.selectedItem };
};

const mapDispatchToProps = {
    onSettingDate: (date: string) => actions.setSelectedDate(date),
    onSettingChangedDate: (date: string) => actions.setChangedDate(date)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
    type: string;
};

export default connector(React.memo(DatePicker));
