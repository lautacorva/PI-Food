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
