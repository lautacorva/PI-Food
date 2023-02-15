import s from './styles/extra.module.css'

export default function ExtraInfo({ diets, dishTypes }) {
    const joinedDiets = diets?.join(', ')

    if (dishTypes) {
        const joinedDishTypes = dishTypes.join(', ')

        return (
            <div className={s.container}>
                <h3 className={s.text}><span style={{ fontWeight: '700' }}>Diets: </span>{joinedDiets}</h3>
                <h3 className={s.text}><span style={{ fontWeight: '700' }}>Dish type: </span>{joinedDishTypes}</h3>
            </div>
        )

    } else {
        return (
            <div className={s.container}>
                <h3 className={s.text}><span style={{ fontWeight: '700' }}>Diets: </span>{joinedDiets}</h3>
            </div>
        )
    }
}