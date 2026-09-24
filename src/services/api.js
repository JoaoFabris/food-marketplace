import axios from 'axios';

// Instância central do axios apontando para o JSON Server.
// Todos os services da aplicação (produtos, auth) usam essa mesma instância.
const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export default api;