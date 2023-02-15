import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getDiets, SubmitRecipe } from "../redux/actions"
import validation from "../validation"

export default function Form({ navigateTo }) {
    const [recipeData, setRecipeData] = useState({
        title: '',
        summary: '',
        healthScore: 0,
        image: '',
        steps: [],
        diets: []
    })
    const [errors, setErrors] = useState({})
    const [numOfSteps, setNumOfSteps] = useState([])
    const diets = useSelector(state => state.diets)
    const dispatch = useDispatch()

    console.log(recipeData);
    console.log(diets);

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    function handleChange(e) {
        setErrors(validation({
            ...recipeData,
            [e.target.name]: e.target.value
        }))

        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value
        })
    }
    function addStep() {
        let step = 1
        setNumOfSteps([...numOfSteps, step])
        setRecipeData({
            ...recipeData,
            steps: [
                ...recipeData.steps,
                {
                    number: numOfSteps.length + 1,
                    step: ''
                }
            ]
        })
    }
    function handleDiet(e) {
        let checked = e.target.checked

        if (checked) {
            let diet = {
                id: e.target.id,
                name: e.target.value
            }
            setRecipeData({
                ...recipeData,
                diets: [
                    ...recipeData.diets,
                    diet
                ]
            })
        }
        if (!checked) {
            const dietsAux = recipeData.diets.filter(d => d.id !== e.target.id)
            setRecipeData({
                ...recipeData,
                diets: [...dietsAux]
            })
        }

        setErrors(validation({
            ...recipeData,
            [e.target.name]: e.target.value
        }))
    }
    function handleStep(e) {
        let step = recipeData.steps.find(s => (s.number == e.target.id))
        let stepsAux = recipeData.steps


        stepsAux[(step.number) - 1].step = e.target.value
        setRecipeData({
            ...recipeData,
            steps: stepsAux
        })

        setErrors(validation({
            ...recipeData,
            [e.target.name]: e.target.value
        }))
    }
    function onSubmit(e) {
        e.preventDefault()

        if (!recipeData.title || !recipeData.summary || recipeData.healthScore === 0 || recipeData.diets.length === 0 || recipeData.steps.length === 0) { return alert('Please complete the required fields to submit') }

        setErrors(validation({
            ...recipeData,
            [e.target.name]: e.target.value
        }))

        if (Object.keys(errors).length === 2) {
            dispatch(SubmitRecipe(recipeData))
            setRecipeData({
                title: '',
                summary: '',
                healthScore: 0,
                image: '',
                steps: [],
                diets: []
            })
            navigateTo('/home')
            alert('Recipe submited!')
        } else {
            alert('Please complete the required fields to submit')
        }
    }


    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>

                <div>
                    <h3>Title</h3>
                    <input type="text" name="title" value={recipeData.title} onChange={handleChange} />
                    {errors.title && <p>{errors.title}</p>}
                </div>

                <div>
                    <h3>Summary</h3>
                    <input type="text" name="summary" value={recipeData.summary} onChange={handleChange} />
                    {errors.summary && <p>{errors.summary}</p>}
                </div>

                <div>
                    <h3>Health Score</h3>
                    <input type="number" name="healthScore" value={recipeData.healthScore} onChange={handleChange} max="100" />
                    {errors.healthScore && <p>{errors.healthScore}</p>}
                </div>

                <div>
                    <h3>Diets</h3>
                    {
                        diets.map((diet) => {
                            return (
                                <div key={diet.id}>
                                    <label>
                                        <input type="checkbox" name="diet" id={diet.id} value={diet.name} onChange={handleDiet} />
                                        {diet.name}
                                    </label><br />
                                </div>
                            )
                        })
                    }
                    {errors.diets && <p>{errors.diets}</p>}
                </div>

                <div>
                    <h3>Image</h3>
                    <input type="text" name="image" value={recipeData.image} onChange={handleChange} />
                </div>

                <div>
                    <h3>Steps</h3>
                    <div>
                        {
                            numOfSteps.map((step, i) => {
                                return (
                                    <div key={i}>
                                        <div>{i + 1}</div>
                                        <input type="text" id={i + 1} onChange={handleStep} />
                                    </div>
                                )
                            })
                        }
                        {errors.steps && <p>{errors.steps}</p>}
                    </div>
                    <button type="button" onClick={addStep}>+ Add step</button>
                </div>

                <hr />

                <button type="submit">Submit</button>

            </form>
        </div>
    )
}