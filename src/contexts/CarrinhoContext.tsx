import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Produto, CarrinhoItem } from '../model/Produto';

interface CarrinhoState {
    itens: CarrinhoItem[];
    total: number;
}

type CarrinhoAction =
    | { type: 'ADICIONAR_ITEM'; payload: Produto }
    | { type: 'REMOVER_ITEM'; payload: number }
    | { type: 'ATUALIZAR_QUANTIDADE'; payload: { produtoId: number; quantidade: number } }
    | { type: 'LIMPAR_CARRINHO' };

const initialState: CarrinhoState = {
    itens: [],
    total: 0,
};

function carrinhoReducer(state: CarrinhoState, action: CarrinhoAction): CarrinhoState {
    switch (action.type) {
        case 'ADICIONAR_ITEM': {
            const produtoExistente = state.itens.find(item => item.produto.id === action.payload.id);
            
            if (produtoExistente) {
                const itensAtualizados = state.itens.map(item =>
                    item.produto.id === action.payload.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
                
                return {
                    ...state,
                    itens: itensAtualizados,
                    total: itensAtualizados.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0),
                };
            } else {
                const novoItem: CarrinhoItem = {
                    produto: action.payload,
                    quantidade: 1,
                };
                
                return {
                    ...state,
                    itens: [...state.itens, novoItem],
                    total: state.total + action.payload.preco,
                };
            }
        }
        
        case 'REMOVER_ITEM': {
            const itemRemovido = state.itens.find(item => item.produto.id === action.payload);
            const itensAtualizados = state.itens.filter(item => item.produto.id !== action.payload);
            
            return {
                ...state,
                itens: itensAtualizados,
                total: state.total - (itemRemovido ? itemRemovido.produto.preco * itemRemovido.quantidade : 0),
            };
        }
        
        case 'ATUALIZAR_QUANTIDADE': {
            const itensAtualizados = state.itens.map(item =>
                item.produto.id === action.payload.produtoId
                    ? { ...item, quantidade: action.payload.quantidade }
                    : item
            );
            
            return {
                ...state,
                itens: itensAtualizados,
                total: itensAtualizados.reduce((sum, item) => sum + (item.produto.preco * item.quantidade), 0),
            };
        }
        
        case 'LIMPAR_CARRINHO':
            return initialState;
        
        default:
            return state;
    }
}

interface CarrinhoContextType {
    state: CarrinhoState;
    adicionarItem: (produto: Produto) => void;
    removerItem: (produtoId: number) => void;
    atualizarQuantidade: (produtoId: number, quantidade: number) => void;
    limparCarrinho: () => void;
    quantidadeTotal: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(carrinhoReducer, initialState);
    
    const adicionarItem = (produto: Produto) => {
        dispatch({ type: 'ADICIONAR_ITEM', payload: produto });
    };
    
    const removerItem = (produtoId: number) => {
        dispatch({ type: 'REMOVER_ITEM', payload: produtoId });
    };
    
    const atualizarQuantidade = (produtoId: number, quantidade: number) => {
        if (quantidade <= 0) {
            removerItem(produtoId);
        } else {
            dispatch({ type: 'ATUALIZAR_QUANTIDADE', payload: { produtoId, quantidade } });
        }
    };
    
    const limparCarrinho = () => {
        dispatch({ type: 'LIMPAR_CARRINHO' });
    };
    
    const quantidadeTotal = state.itens.reduce((sum, item) => sum + item.quantidade, 0);
    
    return (
        <CarrinhoContext.Provider value={{
            state,
            adicionarItem,
            removerItem,
            atualizarQuantidade,
            limparCarrinho,
            quantidadeTotal,
        }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export function useCarrinho() {
    const context = useContext(CarrinhoContext);
    if (context === undefined) {
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }
    return context;
} 