import s from './styles/loading.module.css'

export default function Loading(props) {
    return (
        <div className={s.loading_cont}>
            <div className={s.loading}></div>
        </div>
    )
}