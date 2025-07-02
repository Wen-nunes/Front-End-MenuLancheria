import { useState } from 'react';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { pedidosApi } from '../service/api';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import type { Pedido } from '../model/Produto';
import './Navbar.css';

export function Navbar() {
    const { state, quantidadeTotal, limparCarrinho } = useCarrinho();
    const [showCarrinho, setShowCarrinho] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showPedidos, setShowPedidos] = useState(false);
    const [clienteNome, setClienteNome] = useState('');
    const [clienteTelefone, setClienteTelefone] = useState('');
    const [telefoneConsulta, setTelefoneConsulta] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const { data: pedidos, isLoading: loadingPedidos, refetch: refetchPedidos } = useQuery<Pedido[]>({
        queryKey: ['pedidos-cliente', telefoneConsulta],
        queryFn: async () => {
            if (!telefoneConsulta.trim()) return [];
            const response = await pedidosApi.buscarPorTelefone(telefoneConsulta.trim());
            return response.data;
        },
        enabled: false,
    });

    const handleFinalizarPedido = async () => {
        if (!clienteNome.trim() || !clienteTelefone.trim()) {
            alert('Por favor, preencha nome e telefone');
            return;
        }

        if (state.itens.length === 0) {
            alert('Carrinho vazio');
            return;
        }

        setIsSubmitting(true);
        try {
            const pedido = {
                clienteNome: clienteNome.trim(),
                clienteTelefone: clienteTelefone.trim(),
                itens: state.itens.map(item => ({
                    produtoId: item.produto.id,
                    quantidade: item.quantidade
                }))
            };

            console.log('🛒 Criando pedido:', pedido);
            const response = await pedidosApi.criarPedido(pedido);
            console.log('✅ Pedido criado com sucesso:', response.data);
            
            alert(`Pedido criado com sucesso! ID: ${response.data.id}`);
            limparCarrinho();
            setShowCheckout(false);
            setShowCarrinho(false);
            setClienteNome('');
            setClienteTelefone('');
            
            console.log('🔄 Invalidando queries de pedidos...');
            queryClient.invalidateQueries({ queryKey: ['admin-pedidos'] });
        } catch (error) {
            console.error('❌ Erro ao criar pedido:', error);
            alert('Erro ao criar pedido. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConsultarPedidos = () => {
        if (!telefoneConsulta.trim()) {
            alert('Por favor, digite seu telefone');
            return;
        }
        refetchPedidos();
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

    const getStatusText = (status: string) => {
        const statusMap = {
            'PENDENTE': 'Pendente',
            'CONFIRMADO': 'Confirmado',
            'PRONTO': 'Pronto',
            'CANCELADO': 'Cancelado'
        };
        return statusMap[status as keyof typeof statusMap] || status;
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="public/logo.png" alt="Logo Wenburguer"/>
            </div>
            
            <div className="navbar-actions">
                <button 
                    className="pedidos-button"
                    onClick={() => setShowPedidos(!showPedidos)}
                >
                    📋 Meus Pedidos
                </button>
                
                <button 
                    className="cart-button"
                    onClick={() => setShowCarrinho(!showCarrinho)}
                >
                    🛒 Carrinho
                    {quantidadeTotal > 0 && (
                        <span className="cart-badge">{quantidadeTotal}</span>
                    )}
                </button>
            </div>

            {showPedidos && (
                <div className="pedidos-modal">
                    <div className="pedidos-content">
                        <div className="pedidos-header">
                            <h2>📋 Meus Pedidos</h2>
                            <button 
                                className="close-button"
                                onClick={() => setShowPedidos(false)}
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="consulta-pedidos">
                            <div className="form-group">
                                <label htmlFor="telefone-consulta">Digite seu telefone para consultar:</label>
                                <input
                                    type="tel"
                                    id="telefone-consulta"
                                    value={telefoneConsulta}
                                    onChange={(e) => setTelefoneConsulta(e.target.value)}
                                    placeholder="(11) 99999-9999"
                                />
                            </div>
                            <button 
                                className="consultar-button"
                                onClick={handleConsultarPedidos}
                                disabled={loadingPedidos}
                            >
                                {loadingPedidos ? 'Consultando...' : '🔍 Consultar Pedidos'}
                            </button>
                        </div>

                        {loadingPedidos && (
                            <div className="loading-pedidos">
                                <p>Carregando seus pedidos...</p>
                            </div>
                        )}

                        {pedidos && pedidos.length > 0 && (
                            <div className="pedidos-list">
                                <h3>Seus Pedidos:</h3>
                                {pedidos.map((pedido) => (
                                    <div key={pedido.id} className="pedido-item">
                                        <div className="pedido-header">
                                            <h4>Pedido #{pedido.id}</h4>
                                            <span 
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(pedido.status || 'PENDENTE') }}
                                            >
                                                {getStatusText(pedido.status || 'PENDENTE')}
                                            </span>
                                        </div>
                                        
                                        <div className="pedido-info">
                                            <p><strong>Data:</strong> {new Date(pedido.dataPedido || '').toLocaleString()}</p>
                                            <p><strong>Total:</strong> R$ {pedido.valorTotal?.toFixed(2)}</p>
                                        </div>
                                        
                                        <div className="pedido-items">
                                            <h5>Itens:</h5>
                                            {pedido.itens?.map((item, index) => (
                                                <div key={index} className="pedido-item-detail">
                                                    <span>{item.produtoNome} x{item.quantidade}</span>
                                                    <span>R$ {item.subtotal?.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {pedidos && pedidos.length === 0 && telefoneConsulta && !loadingPedidos && (
                            <div className="no-pedidos">
                                <p>📭 Nenhum pedido encontrado para este telefone.</p>
                                <p>Verifique se o número está correto ou faça um novo pedido.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showCarrinho && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h3>Seu Carrinho</h3>
                        <button 
                            className="close-button"
                            onClick={() => setShowCarrinho(false)}
                        >
                            ✕
                        </button>
                    </div>
                    
                    {state.itens.length === 0 ? (
                        <p className="empty-cart">Carrinho vazio</p>
                    ) : (
                        <>
                            <div className="cart-items">
                                {state.itens.map((item) => (
                                    <div key={item.produto.id} className="cart-item">
                                        <img 
                                            src={item.produto.imagem} 
                                            alt={item.produto.nome}
                                            className="cart-item-image"
                                        />
                                        <div className="cart-item-details">
                                            <h4>{item.produto.nome}</h4>
                                            <p>R$ {item.produto.preco.toFixed(2)} x {item.quantidade}</p>
                                            <p className="cart-item-subtotal">
                                                R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="cart-total">
                                <h3>Total: R$ {state.total.toFixed(2)}</h3>
                            </div>
                            
                            <div className="cart-actions">
                                <button 
                                    className="checkout-button"
                                    onClick={() => setShowCheckout(true)}
                                >
                                    Finalizar Pedido
                                </button>
                                <button 
                                    className="clear-button"
                                    onClick={limparCarrinho}
                                >
                                    Limpar Carrinho
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {showCheckout && (
                <div className="checkout-modal">
                    <div className="checkout-content">
                        <h2>Finalizar Pedido</h2>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                value={clienteNome}
                                onChange={(e) => setClienteNome(e.target.value)}
                                placeholder="Seu nome completo"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                type="tel"
                                id="telefone"
                                value={clienteTelefone}
                                onChange={(e) => setClienteTelefone(e.target.value)}
                                placeholder="(11) 99999-9999"
                                required
                            />
                        </div>
                        <div className="checkout-summary">
                            <h3>Resumo do Pedido:</h3>
                            {state.itens.map((item) => (
                                <div key={item.produto.id} className="summary-item">
                                    <span>{item.produto.nome} x {item.quantidade}</span>
                                    <span>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="summary-total">
                                <strong>Total: R$ {state.total.toFixed(2)}</strong>
                            </div>
                        </div>
                        <div className="checkout-actions">
                            <button 
                                className="confirm-button"
                                onClick={handleFinalizarPedido}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                            </button>
                            <button 
                                className="cancel-button"
                                onClick={() => setShowCheckout(false)}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
} 