import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { login, carregando, erro } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Se o usuário foi redirecionado para cá a partir de uma rota privada,
  // mandamos ele de volta para lá depois do login.
  const destinoAposLogin = location.state?.from || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) {
      navigate(destinoAposLogin, { replace: true });
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="text-3xl">🍔</span>
          <h1 className="text-2xl font-bold text-food-primary mt-1">
            FoodMarket
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Faça login para acessar sua conta
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm"
        >
          {erro && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg p-3">
              {erro}
            </p>
          )}

          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-food-primary"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-food-primary"
          />

          <button
            type="submit"
            disabled={carregando}
            className="bg-food-primary hover:bg-food-primaryDark disabled:opacity-60 text-white rounded-lg p-3 font-medium transition-colors"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Use admin@food.com / 123456 (usuário de teste do db.json)
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
