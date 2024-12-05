import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GerenciadorDeTarefas from './gerenciador-de-tarefas';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';



// Cria a raiz e renderiza o componente App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GerenciadorDeTarefas />
  </React.StrictMode>
);
 
reportWebVitals();
