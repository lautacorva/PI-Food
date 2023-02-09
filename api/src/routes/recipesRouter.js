const { Router } = require('express');
const router = Router();
const { getAllRecipes, getRecipesByName, getRecipesById, createRecipe } = require('../controllers/recipesControllers.js')

router.get('/', async (req, res) => {
    const { name } = req.query

    if (name && name != undefined) {
        try {
            const controller = await getRecipesByName(name)
            res.status(200).send(controller)
        } catch (error) {
            res.status(error.response.status).json({ err: error.message })
            console.log(error.response.data);
        }
    } else {
        try {
            const controller = await getAllRecipes()
            res.status(200).send(controller)
        } catch (error) {
            res.status(error.response.status).json({ err: error.message })
            console.log(error.response.data);
        }
    }
});



router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const controller = await getRecipesById(id)
        res.status(200).send(controller)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
});

router.post('/', async (req, res) => {
    const { title, summary, healthScore, steps, image, DietId } = req.body
    try {
        const controller = await createRecipe(
            title,            
            summary,
            healthScore,            
            steps,
            image,
            DietId
        )
        res.status(201).send(controller)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
})


module.exports = router