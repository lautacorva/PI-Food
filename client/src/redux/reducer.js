import { GET_API_RECIPES, GET_DB_RECIPES, GET_RECIPES_BY_NAME, GET_DIETS, CHANGE_PAGE, ORDER, FILTER } from "./actions-type.js";
import { DEF, ASC, HS } from "../components/Order.jsx";

const initialState = {
    recipes: [],
    filtered_recipes: [],
    filter: false,
    diets: [],
    offset: 0
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_API_RECIPES:
            return {
                ...state,
                recipes: [...action.payload],
                filtered_recipes: [...action.payload]
            }
        case GET_DB_RECIPES:
            return {
                ...state,
                recipes: [...action.payload],
                filtered_recipes: [...action.payload],
                filter: true
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                filtered_recipes: [...action.payload],
                filter: true
            }
        case CHANGE_PAGE:
            return {
                ...state,
                offset: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: [...action.payload]
            }
        case ORDER:
            var Ordered_recipes = [...state.filtered_recipes]
            if (action.payload === DEF) {
                return {
                    ...state,
                    filtered_recipes: state.recipes
                }
            }
            if (action.payload === HS) {
                Ordered_recipes = Ordered_recipes.sort((a, b) => {
                    if (a.healthScore < b.healthScore) {
                        return -1
                    }
                })
            }
            else {
                Ordered_recipes = Ordered_recipes.sort((a, b) => {
                    if (a.title < b.title) {
                        return action.payload === ASC ? -1 : 1
                    }
                    if (a.title > b.title) {
                        return action.payload === ASC ? 1 : -1
                    }
                    return 0
                })
            }
            return {
                ...state,
                filtered_recipes: Ordered_recipes
            }
        case FILTER:
            var filtered_bydiet = []
            if (action.payload !== DEF) {
                const payloadDiet = action.payload.toLowerCase()
                
                for (let i = 0; i < state.recipes.length; i++) {
                    let diets = state.recipes[i].diets

                    console.log(diets);

                    let iFound = diets.includes(payloadDiet)
                    if (iFound) { filtered_bydiet.push(state.recipes[i]) }
                }
                return {
                    ...state,
                    filtered_recipes: filtered_bydiet,
                    filter: true
                }
            } else {
                return {
                    ...state,
                    filtered_recipes: state.recipes
                }
            }
        default:
            return state
    }
}