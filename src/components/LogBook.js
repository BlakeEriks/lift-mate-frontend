import {useEffect, useState} from 'react'
import LiftEditor from './LiftEditor'
import Calendar from './Calendar'
import MovementService from '../services/MovementService'
import { VerticalDivider } from '../styles/Divider'
import useViewport from '../ViewportContext'

const LogBook = () => {

    const [screenWidth, screenHeight] = useViewport()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
    const [liftsThisMonth, setLiftsThisMonth] = useState({})
    const [mobileMode, setMobileMode] = useState('view')

    const addMovementToSelectedDay = movement => {
        let newLiftsThisMonth = {...liftsThisMonth}, date = selectedDate.getDate()
        if (!newLiftsThisMonth[date]) newLiftsThisMonth[date] = []
        newLiftsThisMonth[date].push(movement)
        setLiftsThisMonth(newLiftsThisMonth)
    }

    useEffect( () => {
        MovementService.getAllForMonth(selectedMonth).then( res => {
            let liftsThisMonth = {}
            res.data.forEach(movement => {
                let date = new Date(movement.date).getDate()
                if (!liftsThisMonth[date]) liftsThisMonth[date] = []
                liftsThisMonth[date].push(movement)
            })
            setLiftsThisMonth({...liftsThisMonth})
        })
    }, [selectedMonth])

    const createMovement = movement => {
        movement.date = selectedDate.toLocaleDateString()
        MovementService.create(movement).then(res => {
            addMovementToSelectedDay(res.data)
        })
    }

    const deleteMovement = id => {
        MovementService.delete(id).then(res => {
            const newLiftsThisMonth = {...liftsThisMonth}
            if (newLiftsThisMonth[selectedDate.getDate()].length === 1) {
                newLiftsThisMonth[selectedDate.getDate()] = undefined
            }
            else {
                newLiftsThisMonth[selectedDate.getDate()] = [...newLiftsThisMonth[selectedDate.getDate()].filter(movement => movement._id !== id)]
            }
            setLiftsThisMonth(newLiftsThisMonth)
        })
    }

    const isMobile = () => screenWidth < screenHeight

    const mobileView = () => {
        return (
            <main>
                {(mobileMode === 'edit') && <LiftEditor selectedDate={selectedDate} movements={liftsThisMonth[selectedDate.getDate()]} createMovement={createMovement}deleteMovement={deleteMovement} /> }
                {(mobileMode === 'view') && <Calendar lifts={liftsThisMonth} setSelectedDate={setSelectedDate} selectedDate={selectedDate} selectedMonth={selectedMonth} />}
            </main>
        )
    }

    const desktopView = () => {
        return (
            <main>
                <LiftEditor selectedDate={selectedDate} movements={liftsThisMonth[selectedDate.getDate()]} createMovement={createMovement} deleteMovement={deleteMovement}/>
                <VerticalDivider height='70%'/>
                <Calendar lifts={liftsThisMonth} setSelectedDate={setSelectedDate} selectedDate={selectedDate} selectedMonth={selectedMonth}/>
            </main>
        )
    }

    return isMobile() ? mobileView() : desktopView()

}

export default LogBook