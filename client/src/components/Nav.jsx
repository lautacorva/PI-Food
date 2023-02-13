import Logos from './Logos'
import Search from './Search'
import ArrowButton from './ArrowButton'
import s from './styles/nav.module.css'

export default function Nav({ location }) {

    if (location.pathname != '/home') {
        return (
            <div className={s.container}>
                <Logos />
                <div className={s.actions}>
                    <div className={s.button}><ArrowButton/></div><Search />
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