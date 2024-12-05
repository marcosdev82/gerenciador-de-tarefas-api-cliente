import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CadastrarTarefa from './cadastar-tarefa';
import { MemoryRouter } from 'react-router-dom';

describe('Teste do componente de cadastrar tarefa', () => {
    it('deve renderizar o componente de cadastro de tarefas', () => {
        render(
            <MemoryRouter>
                <CadastrarTarefa />
            </MemoryRouter>
        );
    });

    it('deve cadastrar uma nova tarefa', () => {
        render(
            <MemoryRouter>
                <CadastrarTarefa />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('txt-tarefa'), { target: { value: 'Testar componente' } });
        fireEvent.click(screen.getByTestId('btn-cadastrar'));

        expect(screen.getByTestId('modal')).toHaveTextContent('sucesso');
        expect(screen.getByTestId('modal')).toHaveTextContent('Tarefa adicionada com sucesso!');
    });
});
