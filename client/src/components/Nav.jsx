import { getApiRecipes, getDbRecipes } from '../redux/actions'
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

    function onClicked(e) {
        if (e.target.checked) {
            dispatch(getDbRecipes())
        } else {
            dispatch(getApiRecipes(offset))
        }
    }

    if (location.pathname !== '/home') {
        return (
            <div className={s.up}>
                <Logos />
                <div className={s.actions}>
                    <div className={s.button}><ArrowButton onClick={() => navigateTo('/home')} /></div><Search />
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.container}>

                <div className={s.up}>
                    <Logos />

                    <button className={s.create} onClick={() => navigateTo('/submit-your-recipe')}>Submit your recipe!</button>

                    <Search />
                </div>

                <div className={s.options}>
                    <div className={s.show}>
                        <label className={s.label}><input type="checkbox" onClick={onClicked} className={s.check} />Show my recipes</label>
                    </div>

                    <div className={s.selects}>
                        <Order />
                        <Filters />
                    </div>
                </div>

            </div>
        )
    }
}