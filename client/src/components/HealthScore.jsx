import s from './styles/health.module.css'

export default function HealthScore(props) {
    return (
        <div className={s.container}>
            <div className={s.img_container}></div>
            <h3 className={s.hs}>Health Score: <span>80</span></h3>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis pariatur eveniet nulla fuga necessitatibus cumque, tempora consequatur voluptatem dolore error distinctio quasi quibusdam aperiam deleniti quo inventore ex dolor. Consectetur.</p>
        </div>
    )
}