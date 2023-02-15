const { Router } = require('express');
const router = Router();
const { getApiRecipes, getApiRecipesByName, getDbRecipes, getDbRecipesByName, getRecipesById, createRecipe } = require('../controllers/recipesControllers.js')


router.get('/api', async (req, res) => {
    const { offset, name } = req.query

    if (name && name != 'undefined') {
        try {
            const controller = await getApiRecipesByName(name)
            res.status(200).send(controller)
        } catch (error) {
            res.status(400).json({ err: error.message })
        }

    } else {
        try {
            const controller = await getApiRecipes(offset)
            res.status(200).send(controller)
        } catch (error) {
            res.status(error.response.status).json({ err: error.message })
            console.log(error.response.data);
        }
    }
});

router.get('/db', async (req, res) => {
    const { name } = req.query

    if (name && name != 'undefined') {
        try {
            const controller = await getDbRecipesByName(name)
            res.status(200).send(controller)
        } catch (error) {
            res.status(404).json({ err: error.message })
        }
    } else {
        try {
            const controller = await getDbRecipes()
            res.status(200).send(controller)
        } catch (error) {
            res.status(400).json({ err: error.message })
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

router.post('/db', async (req, res) => {
    const { title, summary, healthScore, steps, image, dietsIds } = req.body
    console.log(req.body);
    try {
        const controller = await createRecipe(
            title,
            summary,
            healthScore,
            steps,
            image,
            dietsIds
        )
        res.status(201).send(controller)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
})


module.exports = router