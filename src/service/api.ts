import axios from 'axios';
import type { Produto, Pedido, CriarPedidoRequest } from '../model/Produto';

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Endpoints para Clientes
export const cardapioApi = {
    // Lista todos os produtos ativos
    listarProdutos: () => api.get<Produto[]>('/cardapio'),
    
    // Produtos ativos por categoria
    produtosPorCategoria: (categoria: string) => api.get<Produto[]>(`/cardapio/categoria/${categoria}`),
    
    // Buscar produtos por nome
    buscarPorNome: (nome: string) => api.get<Produto[]>(`/cardapio/buscar?nome=${nome}`),
    
    // Buscar produto específico
    buscarPorId: (id: number) => api.get<Produto>(`/cardapio/${id}`),
};

// Endpoints para Pedidos
export const pedidosApi = {
    // Criar novo pedido
    criarPedido: (pedido: CriarPedidoRequest) => api.post<Pedido>('/pedidos', pedido),
    
    // Buscar pedido por ID
    buscarPorId: (id: number) => api.get<Pedido>(`/pedidos/${id}`),
    
    // Buscar pedidos por telefone
    buscarPorTelefone: (telefone: string) => api.get<Pedido[]>(`/pedidos/cliente/${telefone}`),
};

// Endpoints Administrativos (se necessário)
export const adminApi = {
    // Produtos
    listarTodosProdutos: () => api.get<Produto[]>('/admin/produtos'),
    buscarProdutoPorId: (id: number) => api.get<Produto>(`/admin/produtos/${id}`),
    criarProduto: (produto: Omit<Produto, 'id'>) => api.post<Produto>('/admin/produtos', produto),
    atualizarProduto: (id: number, produto: Partial<Produto>) => api.put<Produto>(`/admin/produtos/${id}`, produto),
    toggleStatusProduto: (id: number) => api.patch(`/admin/produtos/${id}/toggle-status`),
    deletarProduto: (id: number) => api.delete(`/admin/produtos/${id}`),
    
    // Pedidos
    listarTodosPedidos: () => api.get<Pedido[]>('/admin/pedidos'),
    pedidosPorStatus: (status: string) => api.get<Pedido[]>(`/admin/pedidos/status/${status}`),
    atualizarStatusPedido: (id: number, status: string) => api.patch(`/admin/pedidos/${id}/status/${status}`),
    deletarPedido: (id: number) => api.delete(`/admin/pedidos/${id}`),
    contarPedidosPorStatus: (status: string) => api.get<number>(`/admin/pedidos/contagem/${status}`),
    
    // Dashboard
    estatisticas: () => api.get('/admin/dashboard/estatisticas'),
    resumoPedidos: () => api.get('/admin/dashboard/resumo-pedidos'),
};
