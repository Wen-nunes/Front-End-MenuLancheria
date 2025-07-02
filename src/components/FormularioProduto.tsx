import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState, useEffect} from "react";
import type {Produto} from "../model/Produto.ts";
import {adminApi} from "../service/api.ts";
import "./FormularioProduto.css";

interface FormularioProdutoProps {
    onClose: () => void;
    produto?: Produto | null;
}


export function FormularioProduto({onClose, produto}: FormularioProdutoProps) {
    const queryClient = useQueryClient()
    const isEditing = !!produto;

    const [formData, setFormData] = useState<Omit<Produto, 'id'>>({
        nome: '',
        descricao: '',
        preco: 0,
        imagem: '',
        categoria: '',
        ativo: true,
    })

    useEffect(() => {
        if (produto) {
            setFormData({
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                imagem: produto.imagem,
                categoria: produto.categoria,
                ativo: produto.ativo,
            });
        }
    }, [produto]);

    const mutation = useMutation({
        mutationFn: async (dadosProduto: Omit<Produto, 'id'>) => {
            if (isEditing && produto) {
                const response = await adminApi.atualizarProduto(produto.id, dadosProduto);
                return response.data;
            } else {
                const response = await adminApi.criarProduto(dadosProduto);
                return response.data;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['admin-produtos']})
            queryClient.invalidateQueries({queryKey: ['produtos']})
            alert(isEditing ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!')
            onClose()
        },
        onError: () => {
            alert(isEditing ? 'Erro ao atualizar produto.' : 'Erro ao cadastrar produto.')
        },
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value, type} = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
        }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        mutation.mutate(formData)
    }

    return (
        <form className="formProduto" onSubmit={handleSubmit} style={{margin: '20px'}}>
            <h2>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>

            <label>Nome</label>
            <input name="nome" placeholder="Nome" value={formData.nome}
                   onChange={handleChange} required/>

            <label>Descrição</label>
            <input name="descricao" placeholder="Descrição" value={formData.descricao}
                   onChange={handleChange} required/>

            <label>Link Imagem</label>
            <input name="imagem" placeholder="URL da Imagem" value={formData.imagem}
                   onChange={handleChange} required/>

            <label>Categoria</label>
            <input name="categoria" placeholder="Categoria" value={formData.categoria}
                   onChange={handleChange} required/>

            <label>Preço</label>
            <input name="preco" type="number" step="0.01" placeholder="Preço" value={formData.preco}
                   onChange={handleChange} required/>

            <label>Status</label>
            <select name="ativo" value={formData.ativo.toString()} onChange={handleChange}>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
            </select>

            <br/>

            <button type="submit">
                {isEditing ? 'Atualizar' : 'Cadastrar'}
            </button>
        </form>
    )
}
