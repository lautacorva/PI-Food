import s from './styles/logos.module.css'

export default function Logos(params) {
    return (
        <div className={s.container}>
            <div className={s.log_container_C}></div>
            <span className={s.line}>|</span>
            <div className={s.log_container_H}></div>
        </div>
    )
}