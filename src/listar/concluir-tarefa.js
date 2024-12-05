import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

function ConcluirTarefa(props) {

    const [exibirModal, setExibirModal] = useState(false);

    // Abrir o modal
    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true);
    } 

    // Fechar o modal
    function handleFecharModal() {
        setExibirModal(false);
    }

    // Concluir a tarefa
    function handleConcluirTarefa(event) {
        event.preventDefault();
        const tarefasDb = localStorage['tarefas'];
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
        tarefas = tarefas.map(tarefa => {
            if (tarefa.id === props.tarefa.id) {
                tarefa.concluida = true; // Corrigido para 'concluida'
            }
            return tarefa;
        });

        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);
        props.recarregarTarefas(true);
        // // Verifique se a função está sendo passada corretamente como uma função
        // if (typeof props.recarregarTarefas === 'function') {
        //     props.recarregarTarefas(true); // Chama a função recebida como prop
        // } else {
        //     console.error('A função recarregarTarefas não foi passada corretamente!');
        // }
    }

    return (
        <span className={props.className}>
            <Button className="btn-sm" onClick={handleAbrirModal}
                data-testid="btn-abrir-modal">
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>

            <Modal show={exibirModal} onHide={handleFecharModal}
                data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Concluir Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa?
                    <br />
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleConcluirTarefa}
                        data-testid="concluir-sim">
                            Sim
                    </Button>

                    <Button variant="light" onClick={handleFecharModal}
                        data-testid="concluir-nao">
                            Não
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
}

ConcluirTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired, // Corrigido para 'recarregarTarefas' no lugar de 'carregarTarefa'
    className: PropTypes.string
};

export default ConcluirTarefa;
