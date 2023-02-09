import s from './styles/step.module.css'

export default function Step(props) {
    return(
        <div className={s.container}>
            <div className={s.step_number}><span>1</span></div>
            <div className={s.separator}></div>
            <div className={s.step}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa aspernatur odit, hic officia rem laborum dolor nesciunt dignissimos inventore quos autem sunt deserunt nemo voluptates, quod doloremque qui ducimus perferendis.</div>
        </div>
    )
}