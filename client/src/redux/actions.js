import axios from 'axios'
import { GET_RECIPES } from "./actions-type.js";
const SERVER_HOST = 'localhost:3001'

export function getRecipes(name) {
    return (dispatch) => {
        axios.get(`http://${SERVER_HOST}/recipes`)
            .then(response => dispatch(
                {
                    type: GET_RECIPES,
                    payload: response.data
                }
            ))
            .catch(err => console.log(err))
    }
}

