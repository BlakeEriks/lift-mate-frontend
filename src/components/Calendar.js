import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Day from './Day'

const Calendar = props => {

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [calendar, setCalendar] = useState([])

    useEffect( () => {
        setCalendar(constructCalendar(props))
    }, [props])
    

    return (
        <div className="lift-viewer-panel">
            <div className="calendar">
                <div className='calendar-title'>{monthNames[props.selectedMonth]}</div>

                <div className='calendar-heading' style={{marginBottom: '10px'}}>
                    <div className="calendar-heading-label">S</div>
                    <div className="calendar-heading-label">M</div>
                    <div className="calendar-heading-label">T</div>
                    <div className="calendar-heading-label">W</div>
                    <div className="calendar-heading-label">T</div>
                    <div className="calendar-heading-label">F</div>
                    <div className="calendar-heading-label">S</div>
                </div>

                <div className='calendar-content'>
                {calendar}
                </div>
            </div>
        </div>
    )
}

const constructCalendar = ({lifts, selectedDate, setSelectedDate}) => {

    let weeks = []
    let today = new Date()
    let date = new Date(today.getFullYear(), today.getMonth(), 1)
    let week = []

    while (date.getMonth() === today.getMonth()) {
        if (date.getDay() === 0) {
            weeks.push(
                <div className='calendar-week' key={date.getDate()}>
                    {week}
                </div>
            )
            week = []
        }
        week.push(
            <Day key={date.getDate()} date={new Date(date.getTime())} selected={selectedDate.getDate() === date.getDate()} setSelectedDate={setSelectedDate} 
                hasLift={lifts[date.getDate()]} />
        )
        date.setDate(date.getDate() + 1);
    }
    if (week.length > 0) {
        weeks.push(
        <div className='calendar-week' key={date.getDate()}>
            {week}
        </div>)
    }
    return weeks;
}

export default Calendar