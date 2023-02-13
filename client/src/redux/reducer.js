import { GET_RECIPES, CHANGE_PAGE } from "./actions-type.js";

const initialState = {
    diets: [],
    recipes: [],
    offset: 0
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return{
                ...state,
                recipes: [...action.payload],
            }
        case CHANGE_PAGE:
            return{
                ...state,
                offset: action.payload
            }
        default:
            return state
    }
}