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
    const [movements, setMovements] = useState([])
    const [mobileMode, setMobileMode] = useState('view')

    useEffect( () => {
        MovementService.getAllForMonth(selectedMonth).then( res => {
            setMovements(res.data)
        })
    }, [selectedMonth])

    useEffect( () => {
        setMobileMode('edit')
    }, [selectedDate])

    const createMovement = movement => {
        MovementService.create(movement).then(res => {
            setMovements([...movements, res.data])
        })
    }

    const deleteMovement = id => {
        MovementService.delete(id).then(res => {
            setMovements([...movements.filter(movement => movement._id !== id)])
        })
    }

    const isMobile = () => screenWidth < 600

    const mobileView = () => {
        return (
            <main>
                {(mobileMode === 'edit') && 
                <LiftEditor selectedDate={selectedDate} 
                    movements={movements.filter(movement => new Date(movement.date).getDate() === selectedDate.getDate())} 
                    createMovement={createMovement}
                    deleteMovement={deleteMovement} 
                    setMobileMode={setMobileMode} /> }
                {(mobileMode === 'view') && <Calendar movements={movements} setSelectedDate={setSelectedDate} selectedDate={selectedDate} selectedMonth={selectedMonth} />}
            </main>
        )
    }

    const desktopView = () => {
        return (
            <main>
                <LiftEditor selectedDate={selectedDate} 
                    movements={movements.filter(movement => new Date(movement.date).getDate() === selectedDate.getDate())} 
                    createMovement={createMovement} 
                    deleteMovement={deleteMovement}/>
                <VerticalDivider height='70%'/>
                <Calendar movements={movements} setSelectedDate={setSelectedDate} selectedDate={selectedDate} selectedMonth={selectedMonth}/>
            </main>
        )
    }

    return isMobile() ? mobileView() : desktopView()

}

export default LogBook