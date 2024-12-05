import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import AtualizarTarefa from "./atualizar-tarefa"; // Ajuste o caminho conforme necessário
import Tarefa from "../models/tarefa.model";

describe("Teste do componente de atualização de tarefas", () => {
   
    const tarefaid = 1;
    const tarefa = new Tarefa(tarefaid, 'Nova tarefa', false);

    beforeEach(() => {
        localStorage['tarefas'] = JSON.stringify([tarefa]);
    });

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        const root = createRoot(div); 
        root.render(<AtualizarTarefa id={tarefaid}/>);
    });

});
