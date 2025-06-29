import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuInicial } from "./components/MenuInicial.tsx";
import { PaginaCliente } from "./components/PaginaCliente.tsx";
import { PaginaAdmin } from "./components/PaginaAdmin.tsx";
import "./App.css";

// Criar uma instância do QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

type ModoAcesso = 'menu' | 'cliente' | 'admin';

function App() {
    const [modoAcesso, setModoAcesso] = useState<ModoAcesso>('menu');

    const handleSelecionarModo = (modo: 'cliente' | 'admin') => {
        setModoAcesso(modo);
    };

    const voltarAoMenu = () => {
        setModoAcesso('menu');
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="app">
                {modoAcesso === 'menu' && (
                    <MenuInicial onSelecionarModo={handleSelecionarModo} />
                )}
                
                {modoAcesso === 'cliente' && (
                    <PaginaCliente onVoltar={voltarAoMenu} />
                )}
                
                {modoAcesso === 'admin' && (
                    <PaginaAdmin onVoltar={voltarAoMenu} />
                )}
            </div>
        </QueryClientProvider>
    );
}

export default App;
