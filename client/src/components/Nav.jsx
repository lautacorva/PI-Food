import Logos from './Logos'
import Search from './Search'
import s from './styles/nav.module.css'

export default function Nav(params) {
    return(
        <div className={s.container}>
            <Logos></Logos>
            <Search></Search>
        </div>
    )
}