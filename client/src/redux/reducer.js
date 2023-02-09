import { GET_RECIPES } from "./actions-type.js";

const initialState = {
    diets: [],
    recipes: []
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: [action.payload]
            }
            
        default:
            return state
    }
}