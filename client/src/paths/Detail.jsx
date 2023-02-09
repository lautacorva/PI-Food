import HealthScore from "../components/HealthScore"
import ExtraInfo from "../components/ExtraInfo"
import Step from "../components/Step"
import s from './styles/detail.module.css'


export default function Detail(props) {
    return (<div className={s.container}>
        <HealthScore />
        <h1 className={s.title}>Nombre de la Receta ojo que seguro es largo</h1>
        <ExtraInfo />
        <div className={s.info}>
            <div className={s.img_container}></div>
            <p className={s.summary}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis omnis architecto molestiae itaque dicta, officiis rem magnam sed officia tenetur blanditiis, totam illo ipsam esse qui, voluptas ad ducimus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam voluptatem maiores maxime ad minima consequuntur recusandae, officiis impedit autem possimus officia ducimus tempora dolores beatae. Voluptate vel quod consectetur ea!
            </p>
        </div>
        <div style={{ border: '1px solid grey' }}></div>
        <h2 className={s.steps_title}>Steps</h2>
        <div className={s.steps}>
            <Step />
            <Step />
            <Step />
        </div>
    </div>)
}