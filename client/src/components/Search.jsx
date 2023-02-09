import s from './styles/search.module.css'

export default function Search(params) {
    return (
        <div className={s.container}>
            <div className={s.img_container}></div>
            <div className={s.input_container}><input type="search" placeholder='Search recipe' className={s.input}/></div>
        </div>
    )
}