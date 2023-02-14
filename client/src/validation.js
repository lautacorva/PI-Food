const blankSpace = RegExp(/^\s+$/)
const alphanumeric = RegExp(/^[a-z0-9]+$/i)

export default function validation(input) {
    const errors = {}

    //-------------- CHECKEAR TRADUCCIONES ------------------


    // -- TITLE --
    if (!input.title) { errors.title = 'Please enter a recipe title' }
    else if (blankSpace.test(input.title)) { errors.title = 'The title cannot be a blank space' }
    else if (!alphanumeric.test(input)) {errors.title = 'The title cannot contain symbols'}

    // -- SUMMARY --
    if (!input.summary) { errors.summary = 'Please enter a recipe summary' }
    else if (blankSpace.test(input.summary)) { errors.summary = 'The summary cannot be a blank space' }
    else if (typeof input != 'string') { errors.summary = 'The summary cannot be a number' }

    // -- HEALTH SCORE --
    if (!input.healthScore) { errors.healthScore = 'Please enter a Health Score' }
    else if (input.healthScore < 0 || input.healthScore > 100) { errors.healthScore = 'Healt Score must be a number between 0 and 100' }
    else if (blankSpace.test(input.healthScore)) { errors.healthScore = 'Health Score cannot be a blanck space' }

    // -- DIETS --
    if (input.diets.length === 0) { errors.diets = 'Por favor indica las dietas correspondientes' }

    // -- STEPS --
    if (input.steps.length === 0) { errors.steps = 'Por favor indica al menos un paso' }


    return errors
}