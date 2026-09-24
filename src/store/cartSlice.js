import { createSlice } from '@reduxjs/toolkit';

const CHAVE_CARRINHO = 'food-marketplace:carrinho';

function carregarCarrinhoSalvo() {
    try {
        const salvo = localStorage.getItem(CHAVE_CARRINHO);
        return salvo ? JSON.parse(salvo) : [];
    } catch (erro) {
        console.error('Erro ao ler carrinho do localStorage:', erro);
        return [];
    }
}

const initialState = {
    itens: carregarCarrinhoSalvo(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // O Redux Toolkit usa Immer por baixo dos panos, então dá pra "mutar"
        // o state diretamente aqui dentro (ex: state.itens.push(...)) que ele
        // converte isso em uma atualização imutável de verdade automaticamente.
        addProduct(state, action) {
            const produto = action.payload;
            const existente = state.itens.find((item) => item.id === produto.id);

            if (existente) {
                existente.quantidade += 1;
            } else {
                state.itens.push({ ...produto, quantidade: 1 });
            }
        },

        removeProduct(state, action) {
            const id = action.payload;
            state.itens = state.itens.filter((item) => item.id !== id);
        },

        updateQuantity(state, action) {
            const { id, quantidade } = action.payload;
            if (quantidade < 1) return;

            const item = state.itens.find((item) => item.id === id);
            if (item) {
                item.quantidade = quantidade;
            }
        },

        clearCart(state) {
            state.itens = [];
        },
    },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } = cartSlice.actions;


export const selectItensCarrinho = (state) => state.cart.itens;

export const selectTotalCarrinho = (state) =>
    state.cart.itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

export const selectQuantidadeTotalCarrinho = (state) =>
    state.cart.itens.reduce((soma, item) => soma + item.quantidade, 0);

export default cartSlice.reducer;