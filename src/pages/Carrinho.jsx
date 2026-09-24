import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectItensCarrinho,
  selectTotalCarrinho,
  removeProduct,
  updateQuantity,
  clearCart,
} from '../store/cartSlice';

const IMAGEM_PADRAO = 'https://placehold.co/80x80?text=?';

function Carrinho() {
  const itens = useSelector(selectItensCarrinho);
  const total = useSelector(selectTotalCarrinho);
  const dispatch = useDispatch();

  if (itens.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
        <Link
          to="/"
          className="inline-block bg-food-primary hover:bg-food-primaryDark text-white rounded-lg px-5 py-2.5 font-medium transition-colors"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  function handleFinalizarCompra() {
    alert('Compra finalizada com sucesso! 🎉');
    dispatch(clearCart());
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-food-dark mb-5">Meu Carrinho</h1>

      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100 mb-5 shadow-sm">
        {itens.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4"
          >
            <img
              src={item.imagem || IMAGEM_PADRAO}
              alt={item.nome}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = IMAGEM_PADRAO;
              }}
            />

            <div className="flex-1">
              <h3 className="font-medium text-food-dark">{item.nome}</h3>
              <p className="text-sm text-gray-500">
                R$ {item.preco.toFixed(2)} cada
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantidade: item.quantidade - 1,
                    }),
                  )
                }
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{item.quantidade}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantidade: item.quantidade + 1,
                    }),
                  )
                }
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>

            <p className="sm:w-20 text-right font-medium text-food-dark ml-auto sm:ml-0">
              R$ {(item.preco * item.quantidade).toFixed(2)}
            </p>

            <button
              onClick={() => dispatch(removeProduct(item.id))}
              className="text-red-500 hover:text-red-700 text-sm ml-2"
              title="Remover"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Total</span>
          <span className="text-xl font-bold text-food-dark">
            R$ {total.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleFinalizarCompra}
          className="w-full bg-food-primary hover:bg-food-primaryDark text-white rounded-lg p-3 font-medium transition-colors"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Carrinho;
