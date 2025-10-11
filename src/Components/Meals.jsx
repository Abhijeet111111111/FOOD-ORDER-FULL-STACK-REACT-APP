import MealCard from "./MealCard.jsx";
import useHttp from "../hooks/usehttp.jsx";
import Error from "./Error.jsx";

const config = {};
export default function Meals(){

    const {data:meals , isLoading,error} = useHttp('http://localhost:3000/meals',config,[])
    if(isLoading){
        return <p>fetching meals...</p>
    }
    if(error){
        return <Error title="an error occured..." message={error}/>
    }
    return (
        <ul id="meals">
            {meals.map(meal => <li key={meal.id}>
                <MealCard
                    meal={meal}
                />
            </li>)}
        </ul>
    )
}