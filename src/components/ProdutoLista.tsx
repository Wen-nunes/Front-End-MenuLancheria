import { useQuery } from "@tanstack/react-query";
import { cardapioApi } from "../service/api";
import type { Produto } from "../model/Produto";
import { useCarrinho } from "../contexts/CarrinhoContext";
import './ProdutoLista.css';

export function ProdutoLista() {
    const { adicionarItem } = useCarrinho();
    
    const { data: produtos, isLoading, isError } = useQuery<Produto[]>({
        queryKey: ['produtos'],
        queryFn: async () => {
            const response = await cardapioApi.listarProdutos();
            return response.data;
        }
    });

    const handleAdicionarAoCarrinho = (produto: Produto) => {
        adicionarItem(produto);
    };

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMTAwIDE0MEMxMTYuNTY5IDE0MCAxMzAgMTUzLjQzMSAxMzAgMTcwQzEzMCAxODYuNTY5IDExNi41NjkgMjAwIDEwMCAyMDBDODMuNDMxIDIwMCA3MCAxODYuNTY5IDcwIDE3MEM3MCAxNTMuNDMxIDgzLjQzMSAxNDAgMTAwIDE0MFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+';
    };

    if (isLoading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando produtos...</p>
        </div>
    );
    
    if (isError) return (
        <div className="error-container">
            <p>Erro ao carregar produtos. Verifique se o backend está rodando.</p>
        </div>
    );

    return (
        <div className="produtoLista">
            <h1 className="titulo">🍽️ Nosso Cardápio</h1>
            <div className="produtos-grid">
                {produtos?.map((produto) => (
                    <div key={produto.id} className="produto-card">
                        <div className="produto-imagem">
                            <img 
                                src={produto.imagem || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMTAwIDE0MEMxMTYuNTY5IDE0MCAxMzAgMTUzLjQzMSAxMzAgMTcwQzEzMCAxODYuNTY5IDExNi41NjkgMjAwIDEwMCAyMDBDODMuNDMxIDIwMCA3MCAxODYuNTY5IDcwIDE3MEM3MCAxNTMuNDMxIDgzLjQzMSAxNDAgMTAwIDE0MFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+'} 
                                alt={produto.nome}
                                onError={handleImageError}
                            />
                            {!produto.ativo && (
                                <div className="produto-indisponivel">
                                    <span>Indisponível</span>
                                </div>
                            )}
                        </div>
                        <div className="produto-info">
                            <h2 className="produto-nome">{produto.nome}</h2>
                            <p className="produto-descricao">{produto.descricao}</p>
                            <div className="produto-categoria">
                                <span className="categoria-badge">{produto.categoria}</span>
                            </div>
                            <div className="produto-preco">
                                <span className="preco-valor">R$ {produto.preco.toFixed(2)}</span>
                            </div>
                            <button 
                                className={`adicionar-button ${!produto.ativo ? 'disabled' : ''}`}
                                onClick={() => handleAdicionarAoCarrinho(produto)}
                                disabled={!produto.ativo}
                            >
                                {produto.ativo ? '🛒 Adicionar ao Carrinho' : 'Indisponível'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}