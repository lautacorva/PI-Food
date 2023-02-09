import s from './styles/extra.module.css'

export default function ExtraInfo(props) {
    return(<div className={s.container}>
        <h3 className={s.text}><span style={{fontWeight: '700'}}>Diets: </span>dieta, dietalong, diet</h3>
        <h3 className={s.text}><span style={{fontWeight: '700'}}>Dish type: </span>tipouno, typetwoo</h3>
    </div>)
}