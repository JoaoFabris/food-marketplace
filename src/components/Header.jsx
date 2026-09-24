import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { selectQuantidadeTotalCarrinho } from '../store/cartSlice';

function Header() {
  const { usuario, logout } = useAuth();
  const quantidadeTotal = useSelector(selectQuantidadeTotalCarrinho);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl">🍔</span>
        <span className="text-xl font-bold text-food-primary">FoodMarket</span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className="text-sm text-food-dark hover:text-food-primary transition-colors"
        >
          Início
        </Link>

        {usuario && (
          <Link
            to="/admin"
            className="text-sm text-food-dark hover:text-food-primary transition-colors"
          >
            Admin
          </Link>
        )}

        <Link
          to="/carrinho"
          className="text-sm text-food-dark hover:text-food-primary transition-colors"
        >
          Carrinho ({quantidadeTotal})
        </Link>

        {usuario ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Olá, {usuario.nome}</span>
            <button
              onClick={logout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-food-dark px-3 py-1.5 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-food-primary hover:bg-food-primaryDark text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
