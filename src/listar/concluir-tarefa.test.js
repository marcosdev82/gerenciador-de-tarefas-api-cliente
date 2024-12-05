import React from "react";
import { createRoot } from "react-dom/client";
import ConcluirTarefa from "./concluir-tarefa";
import Tarefa from "../models/tarefa.model";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/react';


describe('Teste de componente de conclusão de tarefas', () => {
  
    const nomeTarefa = 'Tarefa de teste';
    const tarefa = new Tarefa(new Date().getTime(), nomeTarefa, false);
  
    it('Deve renderizar o componente sem erros', () => {
      // Criação de uma div e renderização com React Testing Library
      const div = document.createElement('div');
      const root = createRoot(div);  
  
      root.render(
        <ConcluirTarefa 
          tarefa={tarefa}
          recarregarTarefas={() => false}
        />
      );
  
      // Asserção de que a tarefa está sendo renderizada corretamente
      expect(screen.getByText(nomeTarefa)).toBeInTheDocument();  
    });

    it('Concluir tarefa', () => {
        render(
            <ConcluirTarefa 
                tarefa={tarefa}
                recarregarTarefas={() => false}
            />
        );

        const testTestId = screen.getByTestId('btn-abrir-modal');
        expect(testTestId).toHaveTextContent(nomeTarefa);
    });

    it('Deve concluir uma tarefa', () => {
      localStorage['tarefas'] = JSON.stringify([tarefa]);
      render(
          <ConcluirTarefa
              tarefa={tarefa}
              recarregarTarefas={() => false}
          />
      );
      const tarefasDb =JSON.parse(localStorage['tarefas']);
      fireEvent.click(screen.getAllByTestId('btn-abrir-modal'));
      fireEvent.click(screen.getAllByTestId('btn-concluir'));
      expect(tarefasDb[0].concluida).toBeTruthy();
  });

});