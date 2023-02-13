import HealthScore from "./HealthScore"
import ExtraInfo from "./ExtraInfo"
import Step from "./Step"
import s from './styles/apiDetail.module.css'

export default function ApiDetail({ healthScore, title, diets, dishTypes, image, summary, steps }) {
    return (
        <div className={s.container}>
            <HealthScore healthScore={healthScore} />
            <h1 className={s.title}>{title}</h1>
            <ExtraInfo diets={diets} dishTypes={dishTypes} />
            <div className={s.info}>
                <div className={s.img_container} style={{ backgroundImage: `url(${image})` }}></div>
                <p className={s.summary}>{summary}</p>
            </div>
            <div style={{ border: '1px solid grey' }}></div>
            <h2 className={s.steps_title}>Steps</h2>
            <div className={s.steps}>
                {
                    steps.map(step => {
                        return (
                            <Step number={step.number} step={step.step} />
                        )
                    })
                }
            </div>
        </div>
    )
}