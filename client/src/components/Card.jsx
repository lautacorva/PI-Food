import s from './styles/card.module.css'

export default function RecipeCard({id, title, image}) {
    return(
        <div className={s.container}>
            <div className={s.img_container} style={{backgroundImage: `url(${image})`}}></div>
            <div className={s.text}>
                <h2 className={s.title}>{title}</h2>
                <h4 className={s.diets}>carnivo, vegan, pescatarian</h4>
            </div>
        </div>
    )
}