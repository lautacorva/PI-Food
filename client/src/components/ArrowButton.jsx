import s from './styles/button.module.css'

export default function ArrowButton(props) {
    return(
        <button className={s.button} onClick={props.onClick}></button>
    )
}