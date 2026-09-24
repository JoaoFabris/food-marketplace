import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const CHAVE_CARRINHO = 'food-marketplace:carrinho';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

// Sempre que qualquer action for despachada e o state mudar, salvamos
// o carrinho atualizado no localStorage. Isso substitui o useEffect
// que tínhamos no CartContext.
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(state.cart.itens));
});