import Logos from './Logos'
import Search from './Search'
import s from './styles/nav.module.css'

export default function Nav(props) {
    return(
        <div className={s.container}>
            <Logos/>
            <Search/>
        </div>
    )
}