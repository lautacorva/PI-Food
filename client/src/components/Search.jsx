import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { getApiRecipesByName } from '../redux/actions'
import s from './styles/search.module.css'

export default function Search(props) {
    const [Search, setSearch] = useState('')
    const dispatch = useDispatch()

    function onChange(e) {
        e.preventDefault();
        setSearch(e.target.value)
    }

    function onSearch(e) {
        if (e.key === 'Enter') {
            dispatch(getApiRecipesByName(Search))
        }
    }

    return (
        <div className={s.container}>
            <h2 className={s.text}>What do <span>you</span> want to cook?</h2>
            <div className={s.search_bar}>
                <div className={s.img_container}></div>
                <div className={s.input_container}><input type="search" placeholder='Search recipe' onChange={onChange} onKeyDown={onSearch} value={Search} className={s.input} /></div>
            </div>
        </div>
    )
}