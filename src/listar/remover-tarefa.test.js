import React from "react";
// import { createRoot } from "react-dom/client";
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom';
import RemoverTarefa from './remover-tarefa';

import Tarefa from '../models/tarefa.model';

describe('Teste do componente de remoção de tarefas', () => {

    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(new Date().getTime(), nomeTarefa, false);

    it('Deve renderizar o componente sem erros', () => {

        render(
            <RemoverTarefa 
                tarefas={tarefa}
                recarregarTarefas={() => false}
            />
        );

        const testTestId = screen.getByTestId('tarefa')
        expect(testTestId).toBeInTheDocument();
        
    });

    it('Deve exibir modal', () => {

        render(
            <RemoverTarefa 
                tarefas={tarefa}
                recarregarTarefas={() => false}
            />
        );

        fireEvent.click(screen.getByTestId('btn-abrir-modal'));
        expect(screen.getByTestId('modal')).toHaveTextContent(nomeTarefa);

    });

    it('Deve remover uma tarefa', () => {

        localStorage['tarefa'] = JSON.stringify([tarefa])

        render(
            <RemoverTarefa 
                tarefas={tarefa}
                recarregarTarefas={() => false}
            />
        );

        // Simula os cliques para abrir o modal e confirmar a remoção
        fireEvent.click(screen.getByTestId('btn-abrir-modal'));
        fireEvent.click(screen.getByTestId('btn-remover'));

        // Verifica se a tarefa foi removida do localStorage
        const tarefasDb = JSON.parse(localStorage.getItem('tarefa'));
        expect(tarefasDb.length).toBe(0);

        // Limpa o localStorage após o teste
        localStorage.removeItem('tarefa');

    })

});
