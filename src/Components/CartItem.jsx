import {useContext} from "react";
import {CartContext} from "../store/cart-context-provider.jsx";

export default function CartItem({meal}) {
    const {handleQuantityInc, handleQuantityDec} = useContext(CartContext);
    return (
        <li className="cart-item">
            <p>{meal.name}-{meal.quantity} x {meal.price}</p>
            <div className="cart-item-actions">
                <button onClick={() => handleQuantityInc(meal.id)} className="text-button">+</button>
                <p>{meal.quantity}</p>
                <button onClick={() => handleQuantityDec(meal.id)} className="text-button">-</button>
            </div>

        </li>
    )
}