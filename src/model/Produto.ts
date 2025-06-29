export type Produto = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem: string;
    ativo: boolean;
}

export type ItemPedido = {
    id?: number;
    produtoId: number;
    produtoNome?: string;
    quantidade: number;
    precoUnitario?: number;
    subtotal?: number;
}

export type Pedido = {
    id?: number;
    clienteNome: string;
    clienteTelefone: string;
    dataPedido?: string;
    valorTotal?: number;
    status?: 'PENDENTE' | 'CONFIRMADO' | 'PRONTO' | 'CANCELADO';
    itens: ItemPedido[];
}

export type CriarPedidoRequest = {
    clienteNome: string;
    clienteTelefone: string;
    itens: {
        produtoId: number;
        quantidade: number;
    }[];
}

export type CarrinhoItem = {
    produto: Produto;
    quantidade: number;
}