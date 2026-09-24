import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarProduto } from '../services/produtoService';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/cartSlice';

const IMAGEM_PADRAO = 'https://placehold.co/400x300?text=Sem+Imagem';

function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [adicionado, setAdicionado] = useState(false);
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  function handleAdicionar() {
    dispatch(addProduct(produto));
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1500);
  }
  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const dados = await buscarProduto(id);
        setProduto(dados);
      } catch (e) {
        setErro('Produto não encontrado.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]); // roda de novo sempre que o :id da URL mudar

  if (carregando) {
    return <p className="text-center text-gray-500 py-16">Carregando...</p>;
  }

  if (erro || !produto) {
    return (
      <div className="max-w-md mx-auto px-5 py-10 text-center">
        <p className="mb-4 text-red-500">{erro || 'Produto não encontrado.'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-food-primary text-white rounded-lg px-4 py-2"
        >
          Voltar para a Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 py-8">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <img
          src={produto.imagem || IMAGEM_PADRAO}
          alt={produto.nome}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = IMAGEM_PADRAO;
          }}
        />

        <div className="p-6">
          <span className="text-xs font-medium text-food-primary bg-orange-50 px-2 py-0.5 rounded-full">
            {produto.categoria}
          </span>
          <h2 className="text-xl font-bold text-food-dark mt-2">
            {produto.nome}
          </h2>
          <p className="text-2xl font-bold text-food-dark my-2">
            R$ {produto.preco.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">{produto.descricao}</p>

          {/* O botão já existe visualmente - a lógica de adicionar
              de verdade ao carrinho vem na Etapa 3. */}
          <button
            onClick={handleAdicionar}
            className="w-full bg-food-primary hover:bg-food-primaryDark text-white rounded-lg p-3 font-medium transition-colors"
          >
            {adicionado ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetalhesProduto;
