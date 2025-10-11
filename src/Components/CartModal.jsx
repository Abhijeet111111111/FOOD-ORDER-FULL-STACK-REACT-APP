import {useImperativeHandle, useRef, useContext} from "react";
import CartItem from "./CartItem.jsx";
import {CartContext} from '../store/cart-context-provider.jsx'

export default function CartModal() {
    const {cart, handleOpenForm, cartModal: ref} = useContext(CartContext);
    const totalCost = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
        close() {
            dialog.current.close();
        }
    }))
    return (
        <dialog ref={dialog} className="modal">
            {cart.length !== 0 ? <div className="cart">
                    <h2>Your Cart</h2>
                    <ul>
                        {cart.map(meal => <CartItem key={meal.id} meal={meal}/>)}
                    </ul>
                    <p className="cart-total">{totalCost.toFixed(2)}</p>
                </div>
                : <p>Add Some Items...</p>
            }

            <form method="dialog" className="modal-actions">
                <button style={{color: "black"}} className={totalCost !== 0 ? "text-button" : "button"}>Close</button>
                {cart.length !== 0 && <button className="button" onClick={handleOpenForm}>Checkout</button>}
            </form>
        </dialog>
    )
}