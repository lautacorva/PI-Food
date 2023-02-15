import { OrderRecipes } from "../redux/actions";
import { useDispatch } from "react-redux";
export const DEF = 'DEF'
export const ASC = 'ASC'
export const DES = 'DES'
export const HS = 'HS'

export default function Order(props) {
    const dispatch = useDispatch()

    function onSelect(e) {
        dispatch(OrderRecipes(e.target.value))
    }

    return (
        <div>
            <select name="select" onChange={onSelect}>
                <option selected value={DEF}>Default</option>
                <option value={ASC}>A-Z</option>
                <option value={DES}>Z-A</option>
                <option value={HS}>HealthScore +</option>
            </select>
        </div>
    )
}