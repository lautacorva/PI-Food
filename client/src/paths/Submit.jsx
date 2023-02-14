import Form from '../components/Form'
import s from './styles/submit.module.css'

export default function Submit({ navigateTo }) {
    return (
        <div className={s.container}>
            <h1 className={s.title}>Submit your own recipe!</h1>
            <p className={s.par}>We are looking for new recipes and wants to feature YOURS on our website! Got a recipe that's been passed down in the family? A new recipe you came up with?</p>
            <div className={s.banner}></div>
            <Form navigateTo={navigateTo} />
        </div>
    )
}