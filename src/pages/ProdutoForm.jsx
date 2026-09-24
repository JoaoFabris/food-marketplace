import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buscarProduto,
  criarProduto,
  atualizarProduto,
} from '../services/produtoService';

const CATEGORIAS = ['Pizzas', 'Lanches', 'Saladas', 'Bebidas', 'Sobremesas'];

function ProdutoForm() {
  const { id } = useParams(); // undefined em /admin/novo, preenchido em /admin/editar/:id
  const navigate = useNavigate();
  const modoEdicao = Boolean(id);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [carregando, setCarregando] = useState(modoEdicao);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  // Se estiver em modo edição, busca os dados do produto para pré-preencher o formulário.
  useEffect(() => {
    if (!modoEdicao) return;

    async function carregar() {
      try {
        const produto = await buscarProduto(id);
        setNome(produto.nome);
        setPreco(produto.preco);
        setCategoria(produto.categoria);
        setDescricao(produto.descricao || '');
        setImagem(produto.imagem || '');
      } catch (e) {
        setErro('Não foi possível carregar o produto.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id, modoEdicao]);

  function handleImagemChange(e) {
    const arquivo = e.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = () => setImagem(leitor.result);
    leitor.readAsDataURL(arquivo);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !preco || !categoria) {
      setErro('Preencha nome, preço e categoria.');
      return;
    }

    const dadosProduto = {
      nome,
      preco: parseFloat(preco),
      categoria,
      descricao,
      imagem,
    };

    setSalvando(true);
    setErro('');

    try {
      if (modoEdicao) {
        await atualizarProduto(id, dadosProduto);
      } else {
        await criarProduto(dadosProduto);
      }
      navigate('/admin');
    } catch (e) {
      setErro('Erro ao salvar o produto. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <p className="text-center text-gray-500 py-16">Carregando...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-bold text-food-dark mb-5">
        {modoEdicao ? 'Editar produto' : 'Cadastrar produto'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4 shadow-sm"
      >
        {erro && (
          <p className="bg-red-50 text-red-600 text-sm rounded-lg p-3">
            {erro}
          </p>
        )}

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Nome do produto
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-food-primary"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Preço</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-food-primary"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border border-gray-200 rounded-lg p-2.5 text-sm w-full bg-white"
          >
            <option value="">Selecione uma categoria</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
            className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-food-primary"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Imagem do produto
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
            className="border border-gray-200 rounded-lg p-2 text-sm w-full"
          />
        </div>

        {imagem && (
          <img
            src={imagem}
            alt="Pré-visualização"
            className="w-full h-40 object-cover rounded-lg"
          />
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="flex-1 border border-gray-200 text-food-dark rounded-lg p-2.5 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={salvando}
            className="flex-1 bg-food-primary hover:bg-food-primaryDark disabled:opacity-60 text-white rounded-lg p-2.5 font-medium transition-colors"
          >
            {salvando ? 'Salvando...' : 'Salvar produto'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProdutoForm;
