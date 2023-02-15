import axios from 'axios'
import { GET_API_RECIPES, GET_DB_RECIPES, GET_RECIPES_BY_NAME, CHANGE_PAGE, GET_DIETS, ORDER, FILTER } from "./actions-type.js";
const SERVER_HOST = 'localhost:3001'


// #=====================|  API  |=====================# 

export function getApiRecipes(offset) {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/recipes/api?offset=${offset}`)
            .then(response => dispatch(
                {
                    type: GET_API_RECIPES,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}
export function getApiRecipesByName(name) {

    if (name === '') {
        return (dispatch) => {
            axios.get(`http://${SERVER_HOST}/recipes/api?offset=0`)
                .then(response => dispatch(
                    {
                        type: GET_API_RECIPES,
                        payload: response.data
                    }
                ))
                .catch(err => console.log(err))
        }
    } else {
        return (dispatch) => {
            axios.get(`http://${SERVER_HOST}/recipes/api?name=${name}`)
                .then(response => dispatch(
                    {
                        type: GET_RECIPES_BY_NAME,
                        payload: response.data
                    }
                ))
                .catch(err => console.log(err))
        }
    }


}


// #=====================|  DB  |=====================# 

export function getDbRecipes() {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/recipes/db`)
            .then(response => dispatch(
                {
                    type: GET_DB_RECIPES,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}
export function getDbRecipesByName(name) {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/recipes/db?name=${name}`)
            .then(response => dispatch(
                {
                    type: GET_RECIPES_BY_NAME,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}


// #=====================|  OTHERS  |=====================# 

export function SubmitRecipe(recipe) {
    return () => {
        axios.post(`http://${SERVER_HOST}/recipes/db`, {
            title: recipe.title,
            summary: recipe.summary,
            image: recipe.image,
            healthScore: recipe.healthScore,
            dietsIds: recipe.diets.map(diet => {
                return diet.id
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
export function ChangePage(offset) {
    return {
        type: CHANGE_PAGE,
        payload: offset
    }
}
export function OrderRecipes(order) {
    return {
        type: ORDER,
        payload: order
    }
}
export function FilterRecipes(diet) {
    return {
        type: FILTER,
        payload: diet
    }
}
export function getDiets() {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/diets`)
            .then(response => dispatch(
                {
                    type: GET_DIETS,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}
