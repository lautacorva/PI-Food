const { Diet } = require('./db.js');

const setDiets = async () => {
    try {
        await Diet.create({
            name: 'Gluten free'
        })
        await Diet.create({
            name: 'Dairy free'
        })
        await Diet.create({
            name: 'Ketogenic'
        })
        await Diet.create({
            name: 'Vegetarian'
        })
        await Diet.create({
            name: 'Lacto ovo vegetarian'
        })
        await Diet.create({
            name: 'Vegan'
        })
        await Diet.create({
            name: 'Pescatarian'
        })
        await Diet.create({
            name: 'Paleolithic'
        })
        await Diet.create({
            name: 'Primal'
        })
        await Diet.create({
            name: 'FODMAP friendly'
        })
        await Diet.create({
            name: 'Whole 30'
        })

        console.log('setDiets() OK');

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    setDiets
}