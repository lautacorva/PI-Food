import s from './styles/health.module.css'

export default function HealthScore({ healthScore }) {
    return (
        <div className={s.container}>
            <div className={s.img_container}></div>
            <h3 className={s.hs}>Health Score: <span>{healthScore}</span></h3>
            <p className={s.info}> ⓘ 'Health Score' (HS) is a scoring system that evaluates foods based on their nutrients, calories, etc. From 0 to 100, with foods with a HS closest to 100 being the healthiest.</p>
        </div>
    )
}