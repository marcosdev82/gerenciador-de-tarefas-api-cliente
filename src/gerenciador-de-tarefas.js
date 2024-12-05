import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './gerenciador-de-tarefas.css';

import ListTarefas from './listar/listar-tarefas';
import CadastrarTarefa from './cadastrar/cadastar-tarefa';
import AtualizarTarefa from './atualizar/atualizar-tarefa';


 const routes = [
    { path: "/", element: <ListTarefas /> },
    { path: "/cadastrar", element: <CadastrarTarefa /> },
    { path: "/atualizar/:id", element: <AtualizarTarefa /> },
  ];

function GerenciadorDeTarefas() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default GerenciadorDeTarefas;
