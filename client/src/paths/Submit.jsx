import Form from '../components/Form'
import s from './styles/submit.module.css'

export default function Submit({ navigateTo }) {
    return (
        <div className={s.container}>
            <h1 className={s.title}>Submit your own recipe!</h1>
            <p className={s.parr}>We are looking for new recipes and wants to feature <span>YOURS</span> on our website! Got a recipe that's been passed down in the family? A new recipe you came up with?</p>
            <div className={s.banner}></div>
            <h2 style={{fontSize: '35px', marginBottom: '0px'}}>Complete the following fields</h2>
            <Form navigateTo={navigateTo} />
        </div>
    )
}