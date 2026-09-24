import api from './api';

// Busca todos os produtos.
export async function listarProdutos() {
    const resposta = await api.get('/produtos');
    return resposta.data;
}

// Busca um produto específico pelo id.
export async function buscarProduto(id) {
    const resposta = await api.get(`/produtos/${id}`);
    return resposta.data;
}

// Cria um novo produto. O JSON Server gera o id automaticamente.
export async function criarProduto(produto) {
    const resposta = await api.post('/produtos', produto);
    return resposta.data;
}

// Atualiza um produto existente por completo (PUT substitui o objeto inteiro).
export async function atualizarProduto(id, produto) {
    const resposta = await api.put(`/produtos/${id}`, produto);
    return resposta.data;
}

// Remove um produto.
export async function excluirProduto(id) {
    await api.delete(`/produtos/${id}`);
}