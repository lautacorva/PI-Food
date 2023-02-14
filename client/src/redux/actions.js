import axios from 'axios'
import { GET_RECIPES, CHANGE_PAGE } from "./actions-type.js";
const SERVER_HOST = 'localhost:3001'

export function getRecipes(offset) {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/recipes?offset=${offset}`)
            .then(response => dispatch(
                {
                    type: GET_RECIPES,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}

export function getRecipesByName(name) {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/recipes?name=${name}`)
            .then(response => dispatch(
                {
                    type: GET_RECIPES,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}

export function ChangePage(offset) {
    return {
        type: CHANGE_PAGE,
        payload: offset
    }
}

export function SubmitRecipe(recipe) {
    return () => {
        axios.post(`http://${SERVER_HOST}/recipes`, {
            title: recipe.title,
            summary: recipe.summary,
            image: recipe.image,
            healthScore: recipe.healthScore,
            dietsIds: recipe.diets.map(diet => {
                return (
                    diet.id
                )
            }),
            steps: recipe.steps
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }
}
