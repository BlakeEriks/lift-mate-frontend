const Day = ({date, selected, setSelectedDate, hasLift}) => {
    return (
        <div   
            className={'calendar-day ' + (selected && 'selected')} 
            onClick={() =>  setSelectedDate(date)} >
            {date.getDate()}{ hasLift && '*' }
        </div>
    )
}

export default Day