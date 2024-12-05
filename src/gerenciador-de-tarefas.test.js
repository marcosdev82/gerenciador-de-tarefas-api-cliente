// index.js ou main.js
import React from 'react';
import { createRoot } from "react-dom/client";
import GerenciadorDeTarefas from './gerenciador-de-tarefas';

describe('Deve renderizar o projeto sem erros', () => {
   it('Deve renderizar o componente sem erros', () => {
      const div = document.createElement('div');
      const root = createRoot(div); 
      root.render(<GerenciadorDeTarefas />);
   });
});
