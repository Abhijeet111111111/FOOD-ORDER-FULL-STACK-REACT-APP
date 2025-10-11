import {createContext} from "react";
import {useRef, useState,useReducer} from "react";

export const CartContext = createContext({
    cart:[],
    totalCost:0,
    addToCart : () => {},
    handleOpenCart: () => {},
    handleOpenForm: () => {},
    handleAckOpen : () => {},
    clearCart  : () => {},
    handleCloseForm  : () => {},
    handleQuantityInc  : () => {},
    handleQuantityDec  : () => {},
    handleAckClose : () =>{},
})

function cartReducerFunction (state,action){
    if(action.type === "ADD_TO_CART"){
        return [...state, {...action.payload,['quantity']:1}]
    }
    if(action.type==="QTY_INC"){
        const updatedItems = [...state];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
        return updatedItems;
    }
    if(action.type === "QTY_DEC"){
        const updatedItems = [...state];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity - 1,
        };
        if(updatedItem.quantity === 0){
            return (updatedItems.filter(e => e.id !== action.payload));
        }
        updatedItems[existingCartItemIndex] = updatedItem;
        return updatedItems;
    }
    if(action.type === "CLEAR_CART"){
        return []
    }
}

export default function CartContextProvider({children}){
    const cartModal = useRef()
    const formModal = useRef();
    const ackModal = useRef();
    const [cart,cartActions] = useReducer(cartReducerFunction,[]);

    function addToCart(mealData){
        cartActions({
            type : "ADD_TO_CART",
            payload : mealData
        })
    }
    function handleQuantityInc(id){
        cartActions({
            type:"QTY_INC",
            payload : id
        })
    }
    function handleQuantityDec(id){
        cartActions({
            type:"QTY_DEC",
            payload : id
        })
    }
    function clearCart(){
        cartActions({
            type:"CLEAR_CART",
        })
        formModal.current.close();
    }

    function handleOpenCart(){
        cartModal.current.open();
    }
    function handleOpenForm(){
        formModal.current.open();
        cartModal.current.close();
    }
    function handleAckOpen(){
        ackModal.current.open();
    }

    function handleCloseForm(){
        formModal.current.close();
    }
    function handleAckClose(){
        ackModal.current.close();
    }


    const ctxValues={
        cart,
        addToCart,
        clearCart,
        handleAckOpen,
        handleOpenCart,
        handleOpenForm,
        cartModal,
        formModal,
        ackModal,
        handleCloseForm,
        handleQuantityInc,
        handleQuantityDec,
    }
    return <CartContext.Provider value={ctxValues}>
        {children}
    </CartContext.Provider>
}