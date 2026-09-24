import { createContext, useContext, useState, useEffect } from 'react';
import { autenticar } from '../services/authService';

const AuthContext = createContext(null);

const CHAVE_USUARIO = 'food-marketplace:usuario';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_USUARIO);
      return salvo ? JSON.parse(salvo) : null;
    } catch (erro) {
      console.error('Erro ao ler usuário do localStorage:', erro);
      return null;
    }
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CHAVE_USUARIO);
    }
  }, [usuario]);

  async function login(email, senha) {
    setCarregando(true);
    setErro('');
    try {
      const usuarioLogado = await autenticar(email, senha);
      setUsuario(usuarioLogado);
      return true;
    } catch (e) {
      setErro('Email ou senha inválidos.');
      return false;
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando, erro }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado: em vez de todo componente importar useContext + AuthContext,
// eles só chamam useAuth() e já recebem usuario, login, logout prontos.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }
  return context;
}
