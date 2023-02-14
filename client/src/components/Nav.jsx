import Logos from './Logos'
import Search from './Search'
import ArrowButton from './ArrowButton'
import s from './styles/nav.module.css'

export default function Nav({ location, navigateTo }) {

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
            </div>
        )
    }
}