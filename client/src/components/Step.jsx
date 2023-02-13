import s from './styles/step.module.css'

export default function Step({ number, step }) {
    return (
        <div className={s.container}>
            <div className={s.step_number}><span>{number}</span></div>
            <div className={s.separator}></div>
            <div className={s.step}>{step}</div>
        </div>
    )
}