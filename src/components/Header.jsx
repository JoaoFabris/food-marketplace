import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { selectQuantidadeTotalCarrinho } from '../store/cartSlice';
import IconeCarrinho from './IconeCarrinho';

import logo from '../assets/logo.png';

function Header() {
  const { usuario, logout } = useAuth();
  const quantidadeTotal = useSelector(selectQuantidadeTotalCarrinho);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 no-underline">
        {/* 2. Substituindo a string estática pela variável da imagem importada */}
        <img src={logo} alt="Logo" className="w-15 h-14" />
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
          className="relative text-food-dark hover:text-food-primary transition-colors"
        >
          <IconeCarrinho className="w-6 h-6" />
          {quantidadeTotal > 0 && (
            <span className="absolute -top-2 -right-2 bg-food-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {quantidadeTotal}
            </span>
          )}
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
