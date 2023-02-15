import { Link } from 'react-router-dom'
import s from './styles/card.module.css'

export default function RecipeCard({ id, title, image, diets }) {
    const dietsString = diets?.join(', ')

    return (
        <Link to={`/recipes/${id}`} style={{ textDecoration: 'none' }}>
            <div className={s.container}>
                <div className={s.img_container} style={{ backgroundImage: `url(${image})` }}></div>
                <div className={s.text}>
                    <h2 className={s.title}>{title}</h2>
                    <h4 className={s.diets}>{dietsString}</h4>
                </div>
            </div>
        </Link>
    )
}