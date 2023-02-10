import Logos from './Logos'
import Search from './Search'
import ArrowButton from './ArrowButton'
import s from './styles/nav.module.css'

export default function Nav(props) {
    return (
        <div className={s.container}>
            <Logos />
            <div className={s.actions}>
                <ArrowButton /> <Search />
            </div>
        </div>
    )
}