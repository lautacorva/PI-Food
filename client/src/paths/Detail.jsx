import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ApiDetail from "../components/DetailApi"
import DbDetail from "../components/DetailDb"


export default function Detail(props) {
    const [Recipe, setRecipe] = useState(null)
    const { id } = useParams()
    console.log(id);

    const regex = new RegExp("^[0-9]+$")

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/${id}`)
            .then(response => {
                console.log(response.data);
                setRecipe(response.data)
            })
            .catch(err => console.log(err))
    })
    console.log(Recipe);

    if (Recipe == null) {
        return (
            <div>
                <h3>Loading</h3>
            </div>
        )
    } else {
        if (regex.test(id)) {
            return (
                <ApiDetail
                    key={Recipe.id}
                    healthScore={Recipe.healthScore}
                    title={Recipe.title}
                    diets={Recipe.diets} // DIETS es un array
                    dishTypes={Recipe.dishTypes} // DISHTYPES es un array
                    image={Recipe.image}
                    summary={Recipe.summary}
                    steps={Recipe.steps} // STEPS es un array
                />
            )
        } else {
            return (
                <DbDetail
                    key={Recipe.id}
                    healthScore={Recipe.healthScore}
                    title={Recipe.title}
                    diets={Recipe.diets} // DIETS es un array
                    image={Recipe.image}
                    summary={Recipe.summary}
                    steps={Recipe.steps} // STEPS es un array
                />
            )
        }
    }
}