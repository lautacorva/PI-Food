import RecipeCard from '../components/Card'
import s from './styles/home.module.css'
import { getRecipes } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function Home(props) {
    
    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)

    // useEffect(() => {
    //     dispatch(getRecipes())
    // })

    // if (recipes.length === 0) {
    //     return (
    //         <div className={s.loading}>
    //             <h3>Loading...</h3>
    //         </div>
    //     )
    // } else {
        return (
            <div className={s.cards}>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>                
            </div>
        )
    }
//}