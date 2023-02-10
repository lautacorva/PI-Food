import s from './styles/search.module.css'

export default function Search(props) {
    return (<div className={s.container}>
        <h2 className={s.text}>What do <span>you</span> want to cook?</h2>
        <div className={s.search_bar}>
            <div className={s.img_container}></div>
            <div className={s.input_container}><input type="search" placeholder='Search recipe' className={s.input} /></div>
        </div>
    </div>
    )
}