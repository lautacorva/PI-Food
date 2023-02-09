const { Router } = require('express');
// Importar todos los routers;

const dietsRouter = require('./dietsRouter.js')
const recipesRouter = require('./recipesRouter.js')

const router = Router();

// Configurar los routers
router.use('/diets', dietsRouter)
router.use('/recipes', recipesRouter)



module.exports = router;
