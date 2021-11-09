import { useState } from "react"
import { Button, SquareButton } from "../styles/Button";
import { HorizontalFlexBox } from "../styles/Container";
import { HorizontalDivider } from "../styles/Divider";
import movements from '../movements'
import SelectSearch from "react-select-search";

const MovementCreate = ({createMovement, setMode}) => {

    const [movementType, setMovementType] = useState('')

    const [sets, setSets] = useState([{reps: 0, weight: 0}]);

    const updateSet = index => event => {
        let newSets = [...sets]
        newSets[index][event.target.name] = event.target.value;
        setSets([...newSets])
    }

    const onSubmit = event => {
        event.preventDefault()
        if (sets.length > 0) createMovement({type: movementType, sets})
        setMode('show')
    }

    const handleFilter = (items) => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return options
            }
            return items.filter(item => item.name.includes(searchValue))
        }
    }

    let a = movements.slice(30)
    const options = []
    a.forEach(movement => options.push({name: movement, value: movement}))

    return (
        <form onSubmit={onSubmit} className='movement-create-form'>
            <fieldset className="movement-info">
                <legend className="highlight">Create a Movement</legend>
                <div className="movement-label">Movement Type:</div>
                <SelectSearch
                    options={options}
                    filterOptions={handleFilter}
                    search
                    value={movementType}
                    onChange={value => setMovementType(value)}
                />
                {/* <select type="text" name="type" value={movementType} className="movement-input" onChange={event => setMovementType(event.target.value)}>
                    {movements.map( movement => <option key={movement} value={movement}>{movement}</option>)}
                </select> */}
                <div className="movement-label">Sets:</div>
                {sets.map( (set, index) => 
                    <div className='set-field' key={index}>
                        <input type="number" name="weight" value={set.weight} className="set-input" onChange={updateSet(index)}/>
                        <span className='set-input-text'>lbs</span>
                        <input type="number" name="reps" value={set.reps} className="set-input" onChange={updateSet(index)}/>
                        <span className='set-input-text'>reps</span>
                        <SquareButton type='button' onClick={() => setSets([...sets.filter( (_, setIndex) => setIndex !== index)])}>
                            <i className="fas fa-times small accent"></i>
                        </SquareButton>
                    </div>
                )}
                <HorizontalFlexBox>
                    <Button type='button' onClick={() => setSets([...sets, {reps: sets[sets.length-1].reps, weight: sets[sets.length-1].weight}])}>
                        <i className="fas fa-plus medium accent"></i>
                    </Button>
                </HorizontalFlexBox>
                <HorizontalDivider color={'light'} width='1px'/>
                <HorizontalFlexBox spaceAround>
                    <Button type="reset" onClick={() => setMode('show')} >
                        <i className="fas fa-times medium accent"></i>
                    </Button>
                    <Button type="submit" >
                        <i className="fas fa-check medium accent"></i>
                    </Button>
                </HorizontalFlexBox>
            </fieldset>
        </form>
    )
}

export default MovementCreate