import { useDispatch } from 'react-redux'
import { useState } from "react"
import { SubmitRecipe } from "../redux/actions"
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

    console.log(recipeData);

    const dispatch = useDispatch()


    const diets = [
        {
            id: 1,
            name: 'Vegano'
        },
        {
            id: 2,
            name: 'Carnivoro'
        },
        {
            id: 3,
            name: 'Pescatarian'
        },
    ]


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
    function pushStep(e) {
        let step = recipeData.steps.find(s => (s.number == e.target.id))
        let stepsAux = recipeData.steps

        stepsAux[(step.number) - 1].step = e.target.value
        setRecipeData({
            ...recipeData,
            steps: stepsAux
        })
    }
    function onSubmit(e) {
        e.preventDefault()

        if (!recipeData.title || !recipeData.summary || recipeData.healthScore === 0 || recipeData.diets.length === 0 || recipeData.steps.length === 0) { return alert('Please complete the required fields to submit') }

        setErrors(validation({
            ...recipeData,
            [e.target.name]: e.target.value
        }))

        if (Object.keys(errors).length === 0) {
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
    }


    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>

                <div>
                    <h3>Title</h3>
                    <input type="text" name="title" value={recipeData.title} onChange={handleChange} />
                </div>

                <div>
                    <h3>Summary</h3>
                    <input type="text" name="summary" value={recipeData.summary} onChange={handleChange} />
                </div>

                <div>
                    <h3>Health Score</h3>
                    <input type="number" name="healthScore" value={recipeData.healthScore} onChange={handleChange} max="100" />
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
                                        <input type="text" id={i + 1} onChange={pushStep} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={addStep}>+ Add step</button>
                </div>

            </form>
        </div>
    )
}