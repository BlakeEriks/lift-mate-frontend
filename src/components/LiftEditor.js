import {useState} from 'react'
import moment from 'moment'
import MovementCreate from './MovementCreate'
import Movement from './Movement'
import { useEffect } from 'react/cjs/react.development'
import { Button } from '../styles/Button'
import { HorizontalDivider } from '../styles/Divider'
import { PlusIcon } from '../styles/Icon'

const LiftEditor = ({movements, selectedDate, createMovement, deleteMovement}) => {

    const [mode, setMode] = useState('show')

    useEffect( () => {
        setMode('show')
    }, [selectedDate])

    const movementList = movements => {
        return (
            <>
            {movements ? movements.map( movement => 
                <Movement key={movement._id} {...movement} deleteMovement={deleteMovement} />
            ) : <div className='movement-item'>No Movements</div>}
            <Button onClick={() => setMode('create')}>
                <PlusIcon />
            </Button>
            </>
        )
    }

    return (
        <div className="lift-editor-panel">
            <div className="notepad">
                <h1 className="notepad-title">
                    {moment(selectedDate).format('MMM Do, YYYY')}
                </h1>
                <HorizontalDivider />
                <div className="notepad-content" >
                    {mode === 'show' && movementList(movements)}
                    {mode === 'create' && <MovementCreate createMovement={createMovement} setMode={setMode}/>}
                </div>
            </div>
        </div>
    )
}

export default LiftEditor