import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../service/api';
import type { Produto } from '../model/Produto';
import { FormularioProduto } from './FormularioProduto';
import './PaginaAdmin.css';

interface PaginaAdminProps {
    onVoltar: () => void;
}

export function PaginaAdmin({ onVoltar }: PaginaAdminProps) {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'produtos' | 'pedidos'>('dashboard');
    const [produtoTab, setProdutoTab] = useState<'listar' | 'novo'>('listar');
    const [editingProduto, setEditingProduto] = useState<Produto | null>(null);

    const { data: produtos, isLoading: loadingProdutos, refetch: refetchProdutos } = useQuery<Produto[]>({
        queryKey: ['admin-produtos'],
        queryFn: async () => {
            const response = await adminApi.listarTodosProdutos();
            return response.data;
        }
    });

    const { data: pedidos, isLoading: loadingPedidos, error: pedidosError, refetch: refetchPedidos } = useQuery({
        queryKey: ['admin-pedidos'],
        queryFn: async () => {
            const response = await adminApi.listarTodosPedidos();
            return response.data;
        }
    });

    const handleToggleStatus = async (produtoId: number) => {
        try {
            await adminApi.toggleStatusProduto(produtoId);
            refetchProdutos();
        } catch (error) {
            console.error('Erro ao alterar status:', error);
            alert('Erro ao alterar status do produto');
        }
    };

    const handleEditarProduto = (produto: Produto) => {
        setEditingProduto(produto);
        setProdutoTab('novo');
    };

    const handleAtualizarStatusPedido = async (pedidoId: number, novoStatus: string) => {
        try {
            await adminApi.atualizarStatusPedido(pedidoId, novoStatus);
            refetchPedidos();
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            alert('Erro ao atualizar status do pedido');
        }
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'PENDENTE': '#ffa500',
            'CONFIRMADO': '#007bff',
            'PRONTO': '#28a745',
            'CANCELADO': '#dc3545'
        };
        return colors[status as keyof typeof colors] || '#6c757d';
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMTAwIDE0MEMxMTYuNTY5IDE0MCAxMzAgMTUzLjQzMSAxMzAgMTcwQzEzMCAxODYuNTY5IDExNi41NjkgMjAwIDEwMCAyMDBDODMuNDMxIDIwMCA3MCAxODYuNTY5IDcwIDE3MEM3MCAxNTMuNDMxIDgzLjQzMSAxNDAgMTAwIDE0MFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+';
    };

    const criarProdutosTeste = async () => {
        const produtosTeste = [
            {
                nome: "Pizza Margherita",
                descricao: "Pizza tradicional com molho de tomate, mussarela e manjericão",
                categoria: "Pizzas",
                preco: 25.90,
                imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
                ativo: true
            },
            {
                nome: "Hambúrguer Clássico",
                descricao: "Hambúrguer com carne, alface, tomate e queijo",
                categoria: "Hambúrgueres",
                preco: 18.50,
                imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
                ativo: true
            },
            {
                nome: "Batata Frita",
                descricao: "Porção de batatas fritas crocantes",
                categoria: "Acompanhamentos",
                preco: 12.00,
                imagem: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
                ativo: true
            }
        ];

        try {
            for (const produto of produtosTeste) {
                await adminApi.criarProduto(produto);
            }
            alert('Produtos de teste criados com sucesso!');
            refetchProdutos();
        } catch (error) {
            console.error('Erro ao criar produtos de teste:', error);
            alert('Erro ao criar produtos de teste');
        }
    };

    return (
        <div className="pagina-admin">
            <div className="admin-header">
                <h1>⚙️ Painel Administrativo</h1>
                <button 
                    className="voltar-button"
                    onClick={onVoltar}
                >
                    ⬅️ Voltar ao Menu
                </button>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                >
                    📊 Dashboard
                </button>
                <button 
                    className={`tab-button ${activeTab === 'produtos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('produtos')}
                >
                    🍕 Produtos
                </button>
                <button 
                    className={`tab-button ${activeTab === 'pedidos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pedidos')}
                >
                    📋 Pedidos
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'dashboard' && (
                    <div className="dashboard">
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>Total de Produtos</h3>
                                <p className="stat-number">{produtos?.length || 0}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Total de Pedidos</h3>
                                <p className="stat-number">{pedidos?.length || 0}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Pedidos Pendentes</h3>
                                <p className="stat-number">
                                    {pedidos?.filter(p => p.status === 'PENDENTE').length || 0}
                                </p>
                            </div>
                            <div className="stat-card">
                                <h3>Produtos Ativos</h3>
                                <p className="stat-number">
                                    {produtos?.filter(p => p.ativo).length || 0}
                                </p>
                            </div>
                        </div>
                        
                        <div className="recent-orders">
                            <h3>Pedidos Recentes</h3>
                            <div className="orders-list">
                                {pedidos?.slice(0, 5).map((pedido) => (
                                    <div key={pedido.id} className="order-item">
                                        <div className="order-info">
                                            <h4>Pedido #{pedido.id}</h4>
                                            <p>{pedido.clienteNome} - {pedido.clienteTelefone}</p>
                                            <p>R$ {pedido.valorTotal?.toFixed(2)}</p>
                                        </div>
                                        <div className="order-status">
                                            <span 
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(pedido.status || 'PENDENTE') }}
                                            >
                                                {pedido.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'produtos' && (
                    <div className="produtos-admin">
                        <div className="produtos-navbar">
                            <button 
                                className={`produto-tab ${produtoTab === 'listar' ? 'active' : ''}`}
                                onClick={() => setProdutoTab('listar')}
                            >
                                📋 Listar Produtos
                            </button>
                            <button 
                                className={`produto-tab ${produtoTab === 'novo' ? 'active' : ''}`}
                                onClick={() => {
                                    setProdutoTab('novo');
                                    setEditingProduto(null);
                                }}
                            >
                                ➕ Novo Produto
                            </button>
                        </div>

                        {produtoTab === 'listar' && (
                            <div className="produtos-listar">
                                {loadingProdutos ? (
                                    <div className="loading">Carregando produtos...</div>
                                ) : (
                                    <div className="produtos-grid">
                                        {produtos?.map((produto) => (
                                            <div key={produto.id} className="produto-admin-card">
                                                <img src={produto.imagem} alt={produto.nome} onError={handleImageError} />
                                                <div className="produto-admin-info">
                                                    <h3>{produto.nome}</h3>
                                                    <p>{produto.descricao}</p>
                                                    <p className="categoria">{produto.categoria}</p>
                                                    <p className="preco">R$ {produto.preco.toFixed(2)}</p>
                                                    <div className="status-indicator">
                                                        <span className={`status ${produto.ativo ? 'ativo' : 'inativo'}`}>
                                                            {produto.ativo ? 'Ativo' : 'Inativo'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="produto-admin-actions">
                                                    <button 
                                                        className="edit-button"
                                                        onClick={() => handleEditarProduto(produto)}
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button 
                                                        className="toggle-button"
                                                        onClick={() => handleToggleStatus(produto.id)}
                                                    >
                                                        {produto.ativo ? '🔴 Desativar' : '🟢 Ativar'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {produtoTab === 'novo' && (
                            <div className="produtos-form">
                                <FormularioProduto 
                                    onClose={() => {
                                        setProdutoTab('listar');
                                        setEditingProduto(null);
                                        refetchProdutos();
                                    }}
                                    produto={editingProduto}
                                />
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'pedidos' && (
                    <div className="pedidos-admin">
                        <h2>Gerenciar Pedidos</h2>
                        
                        {loadingPedidos ? (
                            <div className="loading">Carregando pedidos...</div>
                        ) : (
                            <div className="pedidos-list">
                                {pedidos && pedidos.length > 0 ? (
                                    pedidos.map((pedido) => (
                                        <div key={pedido.id} className="pedido-admin-card">
                                            <div className="pedido-header">
                                                <h3>Pedido #{pedido.id}</h3>
                                                <span 
                                                    className="status-badge"
                                                    style={{ backgroundColor: getStatusColor(pedido.status || 'PENDENTE') }}
                                                >
                                                    {pedido.status}
                                                </span>
                                            </div>
                                            
                                            <div className="pedido-info">
                                                <p><strong>Cliente:</strong> {pedido.clienteNome}</p>
                                                <p><strong>Telefone:</strong> {pedido.clienteTelefone}</p>
                                                <p><strong>Data:</strong> {new Date(pedido.dataPedido || '').toLocaleString()}</p>
                                                <p><strong>Total:</strong> R$ {pedido.valorTotal?.toFixed(2)}</p>
                                            </div>
                                            
                                            <div className="pedido-items">
                                                <h4>Itens:</h4>
                                                {pedido.itens?.map((item, index) => (
                                                    <div key={index} className="pedido-item">
                                                        <span>{item.produtoNome} x{item.quantidade}</span>
                                                        <span>R$ {item.subtotal?.toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="pedido-actions">
                                                <select 
                                                    value={pedido.status || 'PENDENTE'}
                                                    onChange={(e) => handleAtualizarStatusPedido(pedido.id!, e.target.value)}
                                                >
                                                    <option value="PENDENTE">Pendente</option>
                                                    <option value="CONFIRMADO">Confirmado</option>
                                                    <option value="PRONTO">Pronto</option>
                                                    <option value="CANCELADO">Cancelado</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ 
                                        textAlign: 'center', 
                                        padding: '2rem', 
                                        color: '#666',
                                        background: 'white',
                                        borderRadius: '8px',
                                        border: '1px solid #dee2e6'
                                    }}>
                                        <p>📭 Nenhum pedido encontrado</p>
                                        <p>Verifique se o backend está rodando e se há pedidos cadastrados.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 