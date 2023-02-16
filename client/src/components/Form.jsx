import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getDiets, SubmitRecipe } from "../redux/actions"
import validation from "../validation"
import s from './styles/form.module.css'

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
        <div className={s.container}>
            <form onSubmit={(e) => onSubmit(e)}>

                <div className={s.all}>

                    <div className={s.inputs}>

                        <div className={s.i_container}>
                            <h3 className={s.text}>Title <span>*</span></h3>
                            <input className={s.input} type="text" name="title" value={recipeData.title} onChange={handleChange} />
                            {errors.title && <p className={s.error}>{errors.title}</p>}
                        </div>

                        <div className={s.i_container}>
                            <h3 className={s.text}>Summary <span>*</span></h3>
                            <input className={s.input} type="text" name="summary" value={recipeData.summary} onChange={handleChange} />
                            {errors.summary && <p className={s.error}>{errors.summary}</p>}
                        </div>

                        <div className={s.i_container}>
                            <h3 className={s.text}>Health Score <span>*</span></h3>
                            <input className={s.input} type="number" name="healthScore" value={recipeData.healthScore} onChange={handleChange} max="100" />
                            {errors.healthScore && <p className={s.error}>{errors.healthScore}</p>}
                        </div>

                        <div className={s.i_container}>
                            <h3 className={s.text}>Image link</h3>
                            <input className={s.input} type="url" name="image" value={recipeData.image} onChange={handleChange} />
                        </div>

                        <div className={s.i_container}>
                            <h3 className={s.text}>Diets <span>*</span></h3>
                            <div className={s.diets}>
                                {
                                    diets.map((diet) => {
                                        return (
                                            <div style={{ margin: '10px' }} key={diet.id}>
                                                <label>
                                                    <input style={{ height: '17px', width: '17px' }} type="checkbox" name="diet" id={diet.id} value={diet.name} onChange={handleDiet} />
                                                    {diet.name}
                                                </label><br />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {errors.diets && <p className={s.error}>{errors.diets}</p>}
                        </div>

                    </div>

                    <div className={s.steps}>
                        <h3 className={s.text}>Steps <span>*</span></h3>

                        <div>
                            {
                                numOfSteps.map((step, i) => {
                                    return (
                                        <div style={{ marginBottom: '10px' }} key={i}>
                                            <textarea className={s.textarea} style={{resize: 'none'}} type="text" id={i + 1} onChange={handleStep} placeholder={'Step ' + (i + 1)} />
                                        </div>
                                    )
                                })
                            }
                            {errors.steps && <p className={s.error}>{errors.steps}</p>}
                        </div>

                        <button className={s.addStep} type="button" onClick={addStep}>+ Add step</button>
                    </div>

                </div>

                <hr />

                <div className={s.submit_container}>
                    <button type="submit" className={s.submit}>Submit</button>
                </div>

            </form>
        </div>

    )
}