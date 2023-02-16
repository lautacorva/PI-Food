const blankSpace = RegExp(/^\s+$/)
const alphanumeric = RegExp(/^[a-z0-9]+$/i)

export default function validation(input) {
    const errors = {}

    // -- TITLE --
    if (!input.title) { errors.title = 'Please enter a recipe title' }
    else if (blankSpace.test(input.title)) { errors.title = 'The title cannot be a blank space' }
    else if (alphanumeric.test(input)) { errors.title = 'The title cannot contain symbols' }

    // -- SUMMARY --
    if (!input.summary) { errors.summary = 'Please enter a recipe summary' }
    else if (blankSpace.test(input.summary)) { errors.summary = 'The summary cannot be a blank space' }
    else if (typeof input.summary != 'string') { errors.summary = 'The summary cannot be a number' }

    // -- HEALTH SCORE --
    if (!input.healthScore) { errors.healthScore = 'Please enter a recipe Health Score' }
    else if (input.healthScore < 0 || input.healthScore > 100) { errors.healthScore = 'Healt Score must be a number between 0 and 100' }
    else if (blankSpace.test(input.healthScore)) { errors.healthScore = 'Health Score cannot be a blanck space' }

    // -- IMAGE --
    if (!input.image) { errors.image = 'Please indicate a image link' }

    // -- DIETS --    
    if (input.diets.length === 0) { errors.diets = 'Please indicate at least two diets' }
    else if (input.diets.length > 0) { errors.diets = '' }
    console.log(input.diets.length);

    // -- STEPS --
    if (input.steps.length === 0) { errors.steps = 'Please indicate at least one step' }
    else if (input.steps.length > 0) { errors.steps = '' }

    let empty = input.steps.find(s => s.step === '')
    if (empty) { errors.steps = 'Step cannot be an empty space' }

    let blank = input.steps.find(s => blankSpace.test(s.step))
    if (blank) { errors.steps = 'Step cannot be an blank space' }

    return errors
}