import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarProdutos, excluirProduto } from '../services/produtoService';

const IMAGEM_PADRAO = 'https://placehold.co/60x60?text=?';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch (e) {
      setErro('Não foi possível carregar os produtos.');
    } finally {
      setCarregando(false);
    }
  }

  async function handleExcluir(id, nome) {
    const confirmar = window.confirm(
      `Excluir "${nome}"? Essa ação não pode ser desfeita.`,
    );
    if (!confirmar) return;

    try {
      await excluirProduto(id);
      setProdutos((atuais) => atuais.filter((p) => p.id !== id));
    } catch (e) {
      alert('Erro ao excluir o produto.');
    }
  }

  if (carregando) {
    return <p className="text-center text-gray-500 py-16">Carregando...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-food-dark">
          Painel Administrativo
        </h1>
        <Link
          to="/admin/novo"
          className="bg-food-primary hover:bg-food-primaryDark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Adicionar produto
        </Link>
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto shadow-sm">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left">
              <th className="p-3 font-medium">Imagem</th>
              <th className="p-3 font-medium">Nome</th>
              <th className="p-3 font-medium">Categoria</th>
              <th className="p-3 font-medium">Preço</th>
              <th className="p-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="border-t border-gray-100">
                <td className="p-3">
                  <img
                    src={produto.imagem || IMAGEM_PADRAO}
                    alt={produto.nome}
                    className="w-12 h-12 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = IMAGEM_PADRAO;
                    }}
                  />
                </td>
                <td className="p-3 font-medium text-food-dark">
                  {produto.nome}
                </td>
                <td className="p-3 text-gray-500">{produto.categoria}</td>
                <td className="p-3 text-food-dark font-medium">
                  R$ {produto.preco.toFixed(2)}
                </td>
                <td className="p-3 text-right">
                  <Link
                    to={`/admin/editar/${produto.id}`}
                    className="text-food-primary hover:underline text-sm mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleExcluir(produto.id, produto.nome)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtos.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Nenhum produto cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;
