import {useImperativeHandle, useRef, useContext, useActionState} from "react";
import {CartContext} from "../store/cart-context-provider.jsx";
import useHttp from "../hooks/usehttp.jsx";

const config = {
    method : "POST",
    headers:{
        'Content-Type' : 'application/json'
    }
}

export default function FormModal() {
    const {cart, handleAckOpen: onSubmit, clearCart, handleCloseForm} = useContext(CartContext)
    const {formModal: ref} = useContext(CartContext)
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
        close() {
            dialog.current.close();
        }
    }))
    const {data,error,sendReq,clearOrderData} = useHttp('http://localhost:3000/orders',config);
    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    async function handleFormAction(prevState, formData) {
        const fullname = formData.get('fullname');
        const email = formData.get('email');
        const street = formData.get('street');
        const postalcode = formData.get('postalCode');
        const city = formData.get('city');
        // console.log(fullname,email,city,street,postalcode);
        let errors = [];
        if (fullname.trim().length < 5) {
            errors.push("full name should have atleast 5 characters")
        }
        if (!email.includes('@')) {
            errors.push("enter a valid email")
        }
        if (street.trim().length < 5) {
            errors.push("enter your street name")
        }
        if (postalcode < 99999 || postalcode > 999999) {
            errors.push("Invalid postal code")
        }
        if (city.trim().length < 5) {
            errors.push("enter your city name ")

        }
        if (errors.length) {
            return {
                errors,
                enteredValues: {
                    fullname,
                    city,
                    street,
                    postalcode,
                    email
                }
            }
        }
         await sendReq(JSON.stringify({
            order: {
                items: [...cart],
                customer: {
                    name: fullname,
                    email,
                    city,
                    street,
                    ['postal-code']: postalcode
                }
            }
        }))

        return {
            errors: null,
        }

    }
    const [formAction, setFormAction, pending] = useActionState(handleFormAction, {errors: null})

    let actions = (
        <>
            <button type="button" onClick={handleCloseForm} style={{color: "black"}}
                    className="text-button">Close
            </button>
            <button className="button">
                Submit
            </button>
        </>

    )
    if(pending){
        actions = <span>sending ...</span>
    }
    if(!error && data){
        clearOrderData();
        onSubmit();
        clearCart();
    }


    return (
        <dialog ref={dialog} className="modal">
            <p>Total Amount : {total}</p>
            <form action={setFormAction} className="control">
                <label htmlFor="fullname">Full Name</label>
                <input name="fullname" type="text" id="fullname" defaultValue={formAction.enteredValues?.fullname}/>
                <label htmlFor="email">Email Address</label>
                <input name="email" type="email" id="email" defaultValue={formAction.enteredValues?.email}/>
                <label htmlFor="street">Street</label>
                <input name="street" type="text" id="street" defaultValue={formAction.enteredValues?.street}/>
                <label htmlFor="postalCode">Postal Code</label>
                <input name="postalCode" type="number" id="postalCode"
                       defaultValue={formAction.enteredValues?.postalcode}/>
                <label htmlFor="city">City</label>
                <input name="city" type="text" id="city" defaultValue={formAction.enteredValues?.city}/>
                <ul>{formAction.errors && formAction.errors.map(e => <li key={e}>{e}</li>)}</ul>
                <div className="modal-actions">

                    <div className="modal-actions">
                        {actions}
                    </div>
                </div>
            </form>
        </dialog>
    )
}