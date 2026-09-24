import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import RotaPrivada from './components/RotaPrivada';
import Home from './pages/Home';
import DetalhesProduto from './pages/DetalhesProduto';
import Carrinho from './pages/Carrinho';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProdutoForm from './pages/ProdutoForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produto/:id" element={<DetalhesProduto />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/admin"
                  element={
                    <RotaPrivada>
                      <Admin />
                    </RotaPrivada>
                  }
                />
                <Route
                  path="/admin/novo"
                  element={
                    <RotaPrivada>
                      <ProdutoForm />
                    </RotaPrivada>
                  }
                />
                <Route
                  path="/admin/editar/:id"
                  element={
                    <RotaPrivada>
                      <ProdutoForm />
                    </RotaPrivada>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
