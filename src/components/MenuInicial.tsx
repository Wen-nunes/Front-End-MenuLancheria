import { useState } from 'react';
import './MenuInicial.css';

interface MenuInicialProps {
    onSelecionarModo: (modo: 'cliente' | 'admin') => void;
}

export function MenuInicial({ onSelecionarModo }: MenuInicialProps) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSelecionarModo = (modo: 'cliente' | 'admin') => {
        setIsAnimating(true);
        setTimeout(() => {
            onSelecionarModo(modo);
        }, 300);
    };

    return (
        <div className="menu-inicial">
            <div className="menu-container">
                <div className="menu-header">
                    <h1 className="menu-titulo">🍕 Menu Digital</h1>
                    <p className="menu-subtitulo">Escolha como deseja acessar o sistema</p>
                </div>
                
                <div className="menu-opcoes">
                    <div 
                        className={`menu-opcao ${isAnimating ? 'fade-out' : 'fade-in'}`}
                        onClick={() => handleSelecionarModo('cliente')}
                    >
                        <div className="opcao-icone">👤</div>
                        <h2>Cliente</h2>
                        <p>Visualizar cardápio e fazer pedidos</p>
                        <ul>
                            <li>Ver produtos disponíveis</li>
                            <li>Adicionar ao carrinho</li>
                            <li>Finalizar pedidos</li>
                            <li>Consultar status</li>
                        </ul>
                        <button className="opcao-botao">
                            Entrar como Cliente
                        </button>
                    </div>
                    
                    <div 
                        className={`menu-opcao ${isAnimating ? 'fade-out' : 'fade-in'}`}
                        onClick={() => handleSelecionarModo('admin')}
                    >
                        <div className="opcao-icone">⚙️</div>
                        <h2>Administrador</h2>
                        <p>Gerenciar produtos e pedidos</p>
                        <ul>
                            <li>Cadastrar produtos</li>
                            <li>Gerenciar estoque</li>
                            <li>Visualizar pedidos</li>
                            <li>Dashboard de vendas</li>
                        </ul>
                        <button className="opcao-botao">
                            Entrar como Admin
                        </button>
                    </div>
                </div>
                
                <div className="menu-footer">
                    <p>Sistema de Menu Digital - Desenvolvido com React + Spring Boot</p>
                </div>
            </div>
        </div>
    );
} 