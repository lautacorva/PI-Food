const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe } = require('../db.js');
const { Op } = require("sequelize");

const getAllRecipes = async () => {
    const res = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=1`)).data
    const apiRecipes = res.results

    const dbRecipes = await Recipe.findAll()

    const allRecipes = [...apiRecipes, ...dbRecipes]
    return allRecipes
}

const getRecipesByName = async (name) => {
    const res = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}&number=1`)).data;
    const apiRecipes = res.results

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


const cleanerFunction = (r) => {
    return {
        id: r.id,
        title: r.title,
        image: r.image,
        summary: r.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
        dishTypes: r.dishTypes,
        diets: r.diets,
        healthScore: r.healthScore,
        steps: r.analyzedInstructions[0]?.steps?.map((e) => {
            return e.step
        })
    }
}


const getRecipesById = async (id) => {
    const regex = new RegExp("^[0-9]+$")

    const recipe =
        regex.test(id)
            ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
            : await Recipe.findByPk(id)

    if (!recipe || recipe.length == 0) { throw new Error('Cannot find recipe') }

    if (regex.test(recipe.id)) {
        const cleanRecipe = cleanerFunction(recipe)
        return cleanRecipe
    } else {
        return recipe
    }
};


const createRecipe = async (title, summary, healthScore, steps, image, DietId) => {

    if (!title || !summary) { throw new Error('You must complete the required fields') }

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

    await newRecipe.addDiet(DietId)
    return newRecipe
};



module.exports = {
    getAllRecipes,
    getRecipesByName,
    getRecipesById,
    createRecipe
}
