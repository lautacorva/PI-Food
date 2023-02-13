import RecipeCard from '../components/Card'
import s from './styles/home.module.css'
import { getRecipes } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function Home(props) {

    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)
    const i = useSelector(state => state.i)

    useEffect(() => {
        dispatch(getRecipes())
    }, [i])

    if (recipes.length === 0) {
        return (
            <div className={s.loading}>
                <h3>Loading...</h3>
            </div>
        )
    } else {
        return (
            <div className={s.cards}>
                {
                    recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            image={recipe.image}
                            diets={recipe.diets} // DIETS es un array
                        />
                    ))
                }
            </div>
        )
    }
}