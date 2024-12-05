import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/react';
import Ordenacao from "./ordenacao";

describe('Teste do componente de ornação', () => {

    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');

        const { unmount } = render(<Ordenacao 
            ordenarAsc={false}
            ordenarDesc={false}
        />, div)

        unmount(); // Desmonta o componente após o teste

    })

    it('Deve exibir a ordernação acendente', () => {
      
        render(<Ordenacao 
            ordenarAsc={true}
            ordenarDesc={false}
        />)

        const faSort = screen.getByTestId('faSort')
        const faSortUp = screen.getByTestId('faSortUp')
        const faSortDown = screen.getByTestId('faSortDown')

        expect(faSort).toHaveClass('hidden')
        expect(faSortUp).not.toHaveClass('hidden')
        expect(faSortDown).toHaveClass('hidden')
    })

    it('Deve exibir a ordernação descendente', () => {
      
        render(<Ordenacao 
            ordenarAsc={false}
            ordenarDesc={true}
        />)

        const faSort = screen.getByTestId('faSort')
        const faSortUp = screen.getByTestId('faSortUp')
        const faSortDown = screen.getByTestId('faSortDown')

        expect(faSort).toHaveClass('hidden')
        expect(faSortUp).toHaveClass('hidden')
        expect(faSortDown).not.toHaveClass('hidden')
    })



});