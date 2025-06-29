import React from 'react';
import './Modal.css';


interface ModalProps {
    isOpen: boolean;            //Define se o modal está visivel ou não
    onClose: () => void;        // Função para fechar o modal
    children: React.ReactNode;  // Elementos filhos que serão renderizados dentro do modal
}

// Componente funcional Modal
export function Modal({ isOpen, onClose, children }: ModalProps) {
    // Se o modal não estiver aberto (isOpen === false), não renderiza nada (retorna null).
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Overlay do modal que cobre a tela */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {/* Botão de fechar no canto superior direito */}
                <button className="close-button" onClick={onClose}>
                    &times; {/* Ícone de fechar */}
                </button>
                <div className="modal-body">
                    {/* Renderiza os filhos dentro do modal */}
                    {children}
                </div>
            </div>
        </div>
    );
}
