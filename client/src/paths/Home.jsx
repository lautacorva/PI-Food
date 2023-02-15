import { getApiRecipes } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import PaginationButtons from '../components/Pagination'
import RecipeCard from '../components/Card'
import s from './styles/home.module.css'

export default function Home(props) {
    const dispatch = useDispatch()
    let offset = useSelector(state => state.offset)
    let filter = useSelector(state => state.filter)

    useEffect(() => {
        dispatch(getApiRecipes(offset))
    }, [offset])

    const recipes = useSelector(state => state.filtered_recipes)
    console.log(recipes);

    if (recipes.length === 0 && filter === true) {
        return (
            <div>
                <h3>Cannot find recipes</h3>
            </div>
        )
    } else if (recipes.length === 0) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    } else {
        return (
            <div className={s.container}>
                <PaginationButtons />
                <div className={s.cards}>
                    {
                        recipes.map(recipe => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                image={recipe.image}
                                diets={recipe.diets}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}
