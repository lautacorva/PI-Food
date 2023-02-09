const { Router } = require('express');
const router = Router();
const getDiets = require('../controllers/dietsController.js')


router.get('/', async (req, res) => {
    try {
        const controller = await getDiets()
        res.status(200).send(controller)
    } catch (error) {
        res.status(404).json({ err: error.message })
    }
});


module.exports = router