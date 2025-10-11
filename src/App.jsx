import Meals from "./Components/Meals.jsx";
import CartModal from "./Components/CartModal.jsx";
import FormModal from "./Components/FormModal.jsx";
import AckModal from "./Components/AckModal.jsx";
import Header from "./Components/Header.jsx";
import CartContextProvider from './store/cart-context-provider.jsx'

function App() {
    return (
        <CartContextProvider>
            <CartModal/>
            <FormModal/>
            <AckModal/>
            <Header/>
            <Meals/>
        </CartContextProvider>
    );

}

export default App;
