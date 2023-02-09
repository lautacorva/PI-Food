const { Diet } = require('../db.js')

const getDiets = () => {
    const diets = Diet.findAll()

    if (diets.length == 0) {throw new Error('database error')}
    
    return diets
}

module.exports = getDiets