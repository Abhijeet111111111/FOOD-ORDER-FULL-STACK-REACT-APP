import Meals from "./Meals.jsx";
import logo from '../assets/logo.jpg'
import {useContext} from "react";
import {CartContext} from "../store/cart-context-provider.jsx";
export default function  Header(){
    const {handleOpenCart,cart} = useContext(CartContext)
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="App logo"/>
                <h1>REACTFOOD</h1>
            </div>
            <button onClick={handleOpenCart} className="text-button">Cart({cart.length})</button>
        </header>
    )
}