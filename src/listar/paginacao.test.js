import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Paginacao from './paginacao';

describe('Teste do componente de paginação', () => {
    it('Deve renderizar o componente sem erros', () => {
        const { unmount } = render(
            <Paginacao
                totalItens={10}
                itemsPorPagina={10}
                paginaAtual={1}
                mudarPagina={() => false}
            />
        );
        unmount(); // Desmonta o componente após o teste
    });

    it('De exibir a paginação com 3 páginas', () => {
        render(
            <Paginacao 
                totalItens={15}
                itemsPorPagina={5}
                paginaAtual={1}
                mudarPagina={() => false} />
        );

        const paginacao = screen.getByTestId('paginacao')
        expect(paginacao).toHaveTextContent('1')
        expect(paginacao).toHaveTextContent('2')
        expect(paginacao).toHaveTextContent('3')

    })
});
