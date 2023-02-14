import { useState } from "react"
import { SubmitRecipe } from "../redux/actions"

export default function Form(props) {
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
    

    function onSubmit(e) {
        e.preventDefault()
        SubmitRecipe(recipeData)
    }

    function handleChange(e) {
        setErrors({
            ...errors,
            [e.target.name]: e.target.value
        })

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
            steps:[
                ...recipeData.steps,
                {
                    number: numOfSteps.length + 1,
                    step: ''
                }
            ]
        })
        
    }

    function pushStep(e) {
        console.log(e.target.id);

        let step = recipeData.steps.find(s => (s.number == e.target.id))
        console.log(recipeData.steps[0].number);

        console.log(step);

        let stepsCopy = recipeData.steps
        stepsCopy[(step.number) - 1].step = e.target.value
        setRecipeData({
            ...recipeData,
            steps: stepsCopy
        })
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
                                        <input type="checkbox" name={diet.name} id={diet.id} />
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