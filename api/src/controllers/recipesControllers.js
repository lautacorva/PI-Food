const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet, recipe_diets } = require('../db.js');
const { Op } = require("sequelize");

// ---- CLEANER FUNCTION ----
const cleanerFunctionID = (r) => {
    return {
        id: r.id,
        title: r.title,
        image: r.image,
        summary: r.summary.replace(/<[^>]+>/g, ''),
        dishTypes: r.dishTypes,
        diets: r.diets,
        healthScore: r.healthScore,
        steps: r.analyzedInstructions[0]?.steps?.map((e) => {
            return {
                number: e.number,
                step: e.step
            }
        })
    }
}


// ---- GET API ----
const getApiRecipes = async (offset) => {
    const res = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${offset}&addRecipeInformation=true&number=9`)).data
    const recipes = res.results

    return recipes
}
const getApiRecipesByName = async (name) => {
    const res = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}&number=9`)).data;
    const recipes = res.results

    if (!recipes) { throw new Error('Cannot find recipes with that name') }
    return recipes
};


// ---- GET DB ----
const getDbRecipes = async () => {
    const recipes = await Recipe.findAll()
    return recipes
}
const getDbRecipesByName = async (name) => {
    const recipes = await Recipe.findAll({
        where: {
            title: {
                [Op.iLike]: `%${name}%`
            }
        }
    })

    if (recipes.length === 0) { throw new Error('Cannot find recipes with that name') }
    return recipes
}


// ---- GET BY ID ----
const getRecipesById = async (id) => {
    const regex = new RegExp("^[0-9]+$")

    const recipe =
        regex.test(id)
            ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
            : await Recipe.findByPk(id)

    if (!recipe || recipe?.length == 0) { throw new Error('Cannot find recipe') }

    if (regex.test(recipe.id)) { // [API]
        const cleanRecipe = cleanerFunctionID(recipe)
        return cleanRecipe
    } else {    // [DB]
        let RecipeDiets = await recipe_diets.findAll()
        let DietsDb = await Diet.findAll()

        let diets_aux = RecipeDiets.filter(rd => rd.recipeId === recipe.id) // Guardo en [diets_aux] las columnas que tengan que ver con esta RECIPE
        diets_aux = diets_aux.map(rd => {                                   // Recorro ese [arr] con .map para retornar un nuevo [arr]
            let diet = DietsDb.find(d => d.id === rd.dietId)                // Busco en DIETS la dieta cuyo ID sea == al ID de la dieta de mi recipe
            if (diet !== null) return diet.name                             // Como es un .map, esto se hace reiteradas veces. Retorno cada nombre(diet)
        })

        const recipeWithDiets = {
            id: recipe.id,
            title: recipe.title,
            summary: recipe.summary,
            image: recipe.image,
            healthScore: recipe.healthScore,
            steps: recipe.steps,
            diets: diets_aux
        }

        return recipeWithDiets
    }
};


// ---- CREATE RECIPE ----
const createRecipe = async (title, summary, healthScore, steps, image, dietsIds) => {
    if (!title || !summary) { throw new Error('Required fields incompletes') }

    const exists = await Recipe.findAll({
        where: {
            title: {
                [Op.iLike]: `${title}`
            }
        }
    })
    if (exists.length > 0) { throw new Error('This recipe already exists') }

    const newRecipe = await Recipe.create({
        title,
        summary,
        healthScore,
        steps,
        image,
    });

    try {
        await newRecipe.addDiets(dietsIds)
    } catch (error) {
        console.log(error);
    }

    return newRecipe
};



module.exports = {
    getApiRecipes,
    getApiRecipesByName,
    getDbRecipes,
    getDbRecipesByName,
    getRecipesById,
    createRecipe
}
