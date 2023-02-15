import { getApiRecipes, getDbRecipes, getDiets } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import Logos from './Logos'
import Search from './Search'
import ArrowButton from './ArrowButton'
import Order from './Order'
import Filters from './Filters'
import s from './styles/nav.module.css'

export default function Nav({ location, navigateTo }) {
    const dispatch = useDispatch()
    let offset = useSelector(state => state.offset)

    const dietsTypes = useSelector(state => state.diets)
    

    function onClicked(e) {
        if (e.target.checked) {
            dispatch(getDbRecipes())
        } else {
            dispatch(getApiRecipes(offset))
        }
    }

    if (location.pathname !== '/home') {
        return (
            <div className={s.container}>
                <Logos />
                <div className={s.actions}>
                    <div className={s.button}><ArrowButton onClick={() => navigateTo('/home')} /></div><Search />
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.container}>
                <Logos />
                <div className={s.actions}>
                    <button className={s.create} onClick={() => navigateTo('/submit-your-recipe')}>Create</button><Search />
                </div>

                <div>
                    <label><input type="checkbox" onClick={onClicked} />Show my recipes</label>
                    <hr />
                </div>
                
                <Order/>
                    
                <Filters/>
                
            </div>
        )
    }
}