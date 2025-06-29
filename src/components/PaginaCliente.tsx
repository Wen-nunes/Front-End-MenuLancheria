import { ProdutoLista } from './ProdutoLista';
import { Navbar } from './Navbar';
import { CarrinhoProvider } from '../contexts/CarrinhoContext';
import './PaginaCliente.css';

interface PaginaClienteProps {
    onVoltar: () => void;
}

export function PaginaCliente({ onVoltar }: PaginaClienteProps) {
    return (
        <CarrinhoProvider>
            <div className="pagina-cliente">
                <Navbar />
                <main className="cliente-content">
                    <button className="voltar-menu-btn" onClick={onVoltar}>
                        ⬅️ Voltar ao Menu
                    </button>
                    <ProdutoLista />
                </main>
            </div>
        </CarrinhoProvider>
    );
} 