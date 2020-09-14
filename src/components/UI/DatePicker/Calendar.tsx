import React, { useState, useRef } from 'react';
import {
    format,
    startOfMonth,
    subMonths,
    addMonths,
    subYears,
    addYears,
    getDaysInMonth,
    getDay,
    endOfMonth,
    setDate,
    getDate,
    isEqual,
    subWeeks,
    addWeeks,
    subDays,
    addDays
} from 'date-fns';
import { chunk } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import {
    Abbreviation,
    Header,
    IconContainer,
    Icons,
    Month,
    Title,
    Wrapper
} from './Calendar.styled';
import './Calendar.css';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

const Calendar = (props: {
    date: string;
    handleSelectDate(date: Date | string): void;
    closeCalendar(): void;
    details: boolean;
}) => {
    const { details, date, handleSelectDate, closeCalendar } = props;
    const [selectedDate, setSelectedDate] = useState(new Date(date));

    const setPreviousMonth = () => {
        const previousMonth = subMonths(selectedDate, 1);
        setSelectedDate(startOfMonth(previousMonth));
    };
    const setNextMonth = () => {
        const nextMonth = addMonths(selectedDate, 1);
        setSelectedDate(startOfMonth(nextMonth));
    };
    const setPreviousYear = () => {
        const previousYear = subYears(selectedDate, 1);
        setSelectedDate(startOfMonth(previousYear));
    };
    const setNextYear = () => {
        const nextYear = addYears(selectedDate, 1);
        setSelectedDate(startOfMonth(nextYear));
    };
    const handleKeyPress = (e: React.KeyboardEvent, cb: () => void) => {
        const charCode = e.charCode;
        if (charCode === 13 || charCode === 32) {
            cb();
        }
    };

    const generateMonth: () => any[][] = () => {
        const daysInMonth = getDaysInMonth(selectedDate);
        const startWeekday = getDay(startOfMonth(selectedDate));
        const endWeekday = getDay(endOfMonth(selectedDate));
        return chunk(
            [
                ...Array.from({ length: startWeekday - 1 }).fill(null),
                ...Array.from({ length: daysInMonth }, (_, i) =>
                    setDate(selectedDate, i + 1)
                ),
                ...Array.from({ length: 5 - endWeekday }).fill(null)
            ],
            7
        );
    };

    const setPreviousDay = () => {
        const previousDay = subDays(selectedDate, 1);
        setSelectedDate(previousDay);
    };
    const setNextDay = () => {
        const nextDay = addDays(selectedDate, 1);
        setSelectedDate(nextDay);
    };
    const setPreviousWeek = () => {
        const previousWeek = subWeeks(selectedDate, 1);
        setSelectedDate(previousWeek);
    };
    const setNextWeek = () => {
        const nextWeek = addWeeks(selectedDate, 1);
        setSelectedDate(nextWeek);
    };
    const setDatePreviousMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };
    const setDateNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };
    const setDatePreviousYear = () => {
        setSelectedDate(subYears(selectedDate, 1));
    };
    const setDateNextYear = () => {
        setSelectedDate(addYears(selectedDate, 1));
    };
    const setMonthStart = () => {
        setSelectedDate(startOfMonth(selectedDate));
    };
    const setMonthEnd = () => {
        setSelectedDate(endOfMonth(selectedDate));
    };
    const handleTableKeyPress = (e: React.KeyboardEvent) => {
        const keyCode = e.keyCode;

        const control = e.shiftKey;
        switch (keyCode) {
            case 13: //Enter
                handleSelectDate(format(selectedDate, 'yyyy-MM-dd'));
                return;
            case 27: //Esc
                closeCalendar();
                return;
            case 32: //Space
                handleSelectDate(format(selectedDate, 'yyyy-MM-dd'));
                return;
            case 33: //Page Up
                control ? setDatePreviousYear() : setDatePreviousMonth();
                return;
            case 34: //Page Down
                control ? setDateNextYear() : setDateNextMonth();
                return;
            case 35: //End
                setMonthEnd();
                return;
            case 36: //Home
                setMonthStart();
                return;
            case 37: //Left
                setPreviousDay();
                return;
            case 38: //Up
                setPreviousWeek();
                return;
            case 39: //Right
                setNextDay();
                return;
            case 40: //Down
                setNextWeek();
                return;
            default:
                return;
        }
    };
    const handleDateSelection = (date: Date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        handleSelectDate(dateString);
    };

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, closeCalendar);

    return (
        <Wrapper details={details} ref={wrapperRef}>
            <Title>
                <Icons>
                    <IconContainer
                        tabIndex={0}
                        onClick={setPreviousYear}
                        onKeyPress={(e) => handleKeyPress(e, setPreviousYear)}
                        role="button"
                        aria-label="Previous year"
                    >
                        <FontAwesomeIcon
                            icon={faAngleDoubleLeft}
                            color={'white'}
                        />
                    </IconContainer>
                    <IconContainer
                        tabIndex={0}
                        onClick={setPreviousMonth}
                        onKeyPress={(e) => handleKeyPress(e, setPreviousMonth)}
                        role="button"
                        aria-label="Previous month"
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color={'white'} />
                    </IconContainer>
                </Icons>
                <Month role="heading">
                    <b>{format(selectedDate, 'MMMM yyyy')}</b>
                </Month>
                <Icons>
                    <IconContainer
                        tabIndex={0}
                        onClick={setNextMonth}
                        onKeyPress={(e) => handleKeyPress(e, setNextMonth)}
                        role="button"
                        aria-label="Next year"
                    >
                        <FontAwesomeIcon icon={faAngleRight} color={'white'} />
                    </IconContainer>
                    <IconContainer
                        tabIndex={0}
                        onClick={setNextYear}
                        onKeyPress={(e) => handleKeyPress(e, setNextYear)}
                        role="button"
                        aria-label="Next year"
                    >
                        <FontAwesomeIcon
                            icon={faAngleDoubleRight}
                            color={'white'}
                        />
                    </IconContainer>
                </Icons>
            </Title>
            <table
                className={'table'}
                id="grid"
                tabIndex={0}
                role="grid"
                aria-label="Month"
                onKeyDown={handleTableKeyPress}
            >
                <thead>
                    <tr role="row">
                        <Header role="columnheader" aria-label="Monday">
                            <Abbreviation title="Monday">Mo</Abbreviation>
                        </Header>
                        <Header role="columnheader" aria-label="Tuesday">
                            <Abbreviation title="Tuesday">Tu</Abbreviation>
                        </Header>
                        <Header role="columnheader" aria-label="Wednesday">
                            <Abbreviation title="Wednesday">We</Abbreviation>
                        </Header>
                        <Header role="columnheader" aria-label="Thursday">
                            <Abbreviation title="Thursday">Th</Abbreviation>
                        </Header>
                        <Header role="columnheader" aria-label="Friday">
                            <Abbreviation title="Friday">Fr</Abbreviation>
                        </Header>
                        <Header role="columnheader" aria-label="Saturday">
                            <Abbreviation title="Saturday">Sa</Abbreviation>
                        </Header>
                        <Header role="columnheader" aria-label="Sunday">
                            <Abbreviation title="Sunday">Su</Abbreviation>
                        </Header>
                    </tr>
                </thead>
                <tbody>
                    {generateMonth().map((week: Date[], i: number) => (
                        <tr className="week" key={`week-${i}`} role="row">
                            {week.map((day: Date, i: number) =>
                                day ? (
                                    <td
                                        className={`cell${
                                            isEqual(selectedDate, day)
                                                ? ' active'
                                                : ''
                                        }`}
                                        key={`day-cell-${i}`}
                                        onClick={() => handleDateSelection(day)}
                                        role="gridcell"
                                        aria-selected={isEqual(
                                            selectedDate,
                                            day
                                        )}
                                    >
                                        {getDate(day)}
                                    </td>
                                ) : (
                                    <td className="empty" key={`day-cell-${i}`}>
                                        &nbsp;
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Wrapper>
    );
};

export default Calendar;
