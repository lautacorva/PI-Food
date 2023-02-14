const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db.js');
const { Op } = require("sequelize");

const cleanerFunctionAll = (recipes) => {
    recipes.map(r => {
        return {
            id: r.id,
            title: r.title,
            diets: r.diets,
            image: r.image
        }
    })
}

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


const getAllRecipes = async (offset) => {
    const res = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&offset=${offset}&addRecipeInformation=true&number=9`)).data
    const apiRecipes = res.results

    const dbRecipes = await Recipe.findAll()

    const allRecipes = [...apiRecipes, ...dbRecipes]
    return allRecipes
}

const getRecipesByName = async (name) => {
    const res = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}&number=9`)).data;
    const results = res.results
    const apiRecipes = cleanerFunctionAll(results)

    const dbRecipes = await Recipe.findAll({
        where: {
            title: {
                [Op.iLike]: `%${name}%`
            }
        }
    })

    const allRecipes = [...apiRecipes, ...dbRecipes]

    if (allRecipes.length == 0) { throw new Error('Cannot find your recipe') }

    return allRecipes
};

const getRecipesById = async (id) => {
    const regex = new RegExp("^[0-9]+$")

    const recipe =
        regex.test(id)
            ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
            : await Recipe.findByPk(id)

    if (!recipe || recipe?.length == 0) { throw new Error('Cannot find recipe') }

    if (regex.test(recipe.id)) {
        const cleanRecipe = cleanerFunctionID(recipe)
        return cleanRecipe
    } else {
        return recipe
    }
};

const createRecipe = async (title, summary, healthScore, steps, image, dietsIds) => {

    if (!title || !summary) { throw new Error('Required fields incompletes') }

    const exists = await Recipe.findAll({
        where: {
            title: {
                [Op.iLike]: `%${title}%`
            }
        }
    })
    if (exists) { throw new Error('This recipe already exists') }

    const newRecipe = await Recipe.create({
        title,
        summary,
        healthScore,
        steps,
        image
    });

    for (const id of dietsIds) {
        await newRecipe.addDiet(id)
    }

    return newRecipe
};



module.exports = {
    getAllRecipes,
    getRecipesByName,
    getRecipesById,
    createRecipe
}
