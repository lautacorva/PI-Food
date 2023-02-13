import s from './styles/card.module.css'

export default function RecipeCard({id, title, image, diets}) {
    return(
        <div className={s.container}>
            <div className={s.img_container}></div>
            <div className={s.text}>
                <h2 className={s.title}>Recipe's title celi te amo mi amor</h2>
                <h4 className={s.diets}>Vegan, Celiaco</h4>
            </div>
        </div>
    )
}