import { OrderRecipes } from "../redux/actions";
import { useDispatch } from "react-redux";
import s from './styles/order.module.css'

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
        <div className={s.container}>
            <span className={s.text}>Order</span>
            <select name="select" onChange={onSelect} className={s.select}>
                <option selected value={DEF}>default</option>
                <option value={ASC}>A-Z</option>
                <option value={DES}>Z-A</option>
                <option value={HS}>HealthScore +</option>
            </select>
        </div>
    )
}