import {CartContext} from "../store/cart-context-provider.jsx";
import {useContext} from "react";
export default function MealCard({meal}){
    const {addToCart:onAddItem} = useContext(CartContext)
    return (
        <article className="meal-item meal-item-actions">
            <img src={"http://localhost:3000/"+meal.image} alt={name} />
            <h3>{meal.name}</h3>
            <h4 className="meal-item-price">${meal.price}</h4>
            <p className="meal-item-description">{meal.description}</p>
            <button className="button" onClick={() => onAddItem(meal)}>Add To Cart</button>
        </article>
    )
}