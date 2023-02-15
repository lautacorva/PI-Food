import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getDiets, FilterRecipes } from '../redux/actions'
import { DEF } from './Order'
import s from './styles/filters.module.css'

export default function Filters(props) {
    const dispatch = useDispatch()
    let offset = useSelector(state => state.offset)

    useEffect(() => {
        dispatch(getDiets())
    }, [offset])

    const diets = useSelector(state => state.diets)

    function onSelect(e) {
        dispatch(FilterRecipes(e.target.value))
        console.log(e.target.value);
    }

    return (
        <div className={s.container}>
            <span className={s.text}>Diets</span>
            <select name="diets" onChange={onSelect} className={s.select}>
                <option selected value={DEF}>default</option>
                {
                    diets.map(d => {
                        return (
                            <option key={d.id} id={d.id} value={d.name}>{d.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}