import React from "react";
import { createRoot } from "react-dom/client";
import ListTarefas from "./listar-tarefas";
import Tarefa from '../models/tarefa.model';
import { render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Teste do componente de listagem de tarefas', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        const root = createRoot(div); 
        root.render(<ListTarefas />);
    });

    const primeiraTarefa = 'Primeira tarefa';
    const segundaTarefa = 'Segunda tarefa';
    const terceiraTarefa = 'Terceira tarefa';

    beforeEach(() => {
        localStorage['tarefas'] = JSON.stringify([
            new Tarefa(1, primeiraTarefa, false),
            new Tarefa(2, segundaTarefa, false),
            new Tarefa(3, terceiraTarefa, false)
        ]);
    });

    afterEach(() => {
        delete localStorage['tarefa'];
    });
    
    it('Deve renderizar 3 tarefas', () => {

        render(<ListTarefas />);
        const tabela = screen.getByTestId('tabela')
        expect(tabela).toHaveTextContent(primeiraTarefa);
        expect(tabela).toHaveTextContent(segundaTarefa);
        expect(tabela).toHaveTextContent(terceiraTarefa);
        
    });

    it('Deve filtrar os dados da tabela de tarefas', () => {
         
        render(<ListTarefas />);
        const tabela = screen.getByTestId('text-tarefa')

        fireEvent.change(tabela, { target: {value: primeiraTarefa}});
        expect(tabela).toHaveTextContent(primeiraTarefa);
        expect(tabela).not.toHaveTextContent(segundaTarefa);
        expect(tabela).not.toHaveTextContent(terceiraTarefa);

    });

   
});
