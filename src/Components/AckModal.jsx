import {useImperativeHandle, useRef,useContext} from "react";
import {CartContext} from "../store/cart-context-provider.jsx";
export default function AckModal(){
    const {ackModal:ref} = useContext(CartContext)
    const dialog = useRef();
    useImperativeHandle(ref,()=>({
        open(){
            dialog.current.showModal();
        },
        close(){
            dialog.current.close();
        }
    }))
    return (
        <dialog ref={dialog} className="modal">
            <h3>Success</h3>
            <p>Your order has been placed...</p>
            <form method="dialog" className="modal-actions">
                {ref !== 'ackModal' && <button style={{color: "black"}} className="text-button">Close</button>}
            </form>
        </dialog>
    )
}