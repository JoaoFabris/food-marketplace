import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { listarProdutos } from '../services/produtoService';
import ProdutoCard from '../components/ProdutoCard';
import { addProduct } from '../store/cartSlice';
import IconeCarrinho from '../components/IconeCarrinho';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get('categoria') || 'Todas';

  function handleAdicionarRapido(e, produto) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addProduct(produto));
  }

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const dados = await listarProdutos();
        setProdutos(dados);
      } catch (e) {
        setErro(
          'Não foi possível carregar os produtos. Verifique se o servidor (json-server) está rodando.',
        );
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const categorias = ['Todas', ...new Set(produtos.map((p) => p.categoria))];

  const produtosFiltrados =
    categoriaFiltro === 'Todas'
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaFiltro);

  function handleFiltroChange(categoria) {
    if (categoria === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria });
    }
  }

  if (carregando) {
    return (
      <p className="text-center text-gray-500 py-16">Carregando produtos...</p>
    );
  }

  if (erro) {
    return <p className="text-center text-red-500 py-16">{erro}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-food-dark">Nossos Produtos</h1>

        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFiltroChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                categoriaFiltro === cat
                  ? 'bg-food-primary text-white border-food-primary'
                  : 'bg-white text-food-dark border-gray-200 hover:border-food-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-gray-500">
          Nenhum produto encontrado nessa categoria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {produtosFiltrados.map((produto) => (
            <div key={produto.id} className="relative">
              <Link
                to={`/produto/${produto.id}`}
                className="no-underline text-inherit block"
              >
                <ProdutoCard produto={produto} />
              </Link>
              <button
                onClick={(e) => handleAdicionarRapido(e, produto)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-food-primary text-white flex items-center justify-center hover:bg-food-primaryDark transition-colors shadow-sm"
                aria-label={`Adicionar ${produto.nome} ao carrinho`}
                title="Adicionar ao carrinho"
              >
                <IconeCarrinho className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
