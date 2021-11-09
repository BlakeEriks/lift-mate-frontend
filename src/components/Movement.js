import { SquareButton } from "../styles/Button"
import { TimesIcon } from "../styles/Icon"

const Movement = ({type, sets, _id, deleteMovement}) => {

    return (
        <div className="movement-item" >
            {type} - {sets?.length} Sets 
            <SquareButton onClick={() => deleteMovement(_id)}>
                <TimesIcon />
            </SquareButton>
        </div>
    )
}

export default Movement