import Nav from '../components/Nav'
import RecipeCard from '../components/Card'
import s from './styles/home.module.css'
import { getRecipes } from '../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function Home(props) {
    // Cuando se renderice el comp (useEffect) hay que setear el estado global con todas las recetas.
    // ---EL REDUCER ES EL ENCARGADO DE CONSULTAR LA API---
    // useEffect -> despacha una acción (EN ACTIONS ESTÁN LAS ACTIONS QUE REALIZAN LA PETICION)
    // useEffect --> dispatch(getRecipes) --> getRecipes axios(para cargar el array de recipes en su payload) --> 
    // reducer recibe y setea el STATE con el array. ;)

    const dispatch = useDispatch()
    const recipes = useSelector(state => state.recipes)

    useEffect(() => {
        dispatch(getRecipes())
    })

    console.log(recipes);

    if (recipes.length === 0) {
        return (
            <div className={s.loading}>
                <h3>Loading...</h3>
            </div>
        )
    }

    return (<>
        <Nav></Nav>
        <div className={s.cards}>
            {
                recipes.map((recipe) => {
                    return <Card key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} diets={recipe.diets} />                                     
                })
            }
        </div>
    </>
    )
}