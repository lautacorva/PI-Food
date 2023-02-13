import Logos from './Logos'
import Search from './Search'
import ArrowButton from './ArrowButton'
import s from './styles/nav.module.css'

export default function Nav({ location, navegateTo }) {

    if (location.pathname !== '/home') {
        return (
            <div className={s.container}>
                <Logos />
                <div className={s.actions}>
                    <div className={s.button}><ArrowButton onClick={() => navegateTo('/home')}/></div><Search />
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.container}>
                <Logos />
                <Search />
            </div>
        )
    }
}