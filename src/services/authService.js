import api from './api';

// Busca por email (filtro simples, que funciona nessa versão do JSON Server)
// e depois comparamos a senha no próprio código React.
export async function autenticar(email, senha) {
    const resposta = await api.get('/usuarios', {
        params: { email },
    });

    const usuario = resposta.data.find((u) => u.senha === senha);

    if (!usuario) {
        throw new Error('Email ou senha inválidos');
    }

    const { senha: _senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
}