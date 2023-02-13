import { getRecipes } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import PaginationButtons from '../components/Pagination'
import RecipeCard from '../components/Card'
import s from './styles/home.module.css'

export default function Home(props) {
    let recipes = useSelector(state => state.recipes)
    let offset = useSelector(state => state.offset)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipes(offset))
    }, [offset])

    if (recipes.length === 0) {
        return (
            <div className={s.loading}>
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
                                diets={recipe.diets} // DIETS es un array
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}