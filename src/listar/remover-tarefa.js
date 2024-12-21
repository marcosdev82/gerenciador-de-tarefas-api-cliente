import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function RemoverTarefa(props) {

    const API_URL_REMOVER_TAREFAS = 'http://localhost:4000/gerenciador-tarefas/';

    const [exibirModal, setExibirModal] = useState(false)
    const [exibirModalErro, setExibirModalErro] = useState(false)
    
    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    async function handleRemoverTarea(event) {
        event.preventDefault();
        
        try {
            // console.log(API_URL_REMOVER_TAREFAS + props.tarefa.id) 
            // return;
            await axios.delete(API_URL_REMOVER_TAREFAS + props.tarefa.id)
            setExibirModal(false)
            props.recarregarTarefas(true);
        } catch (err) {
            setExibirModal(false)
            setExibirModalErro(true);
        }


    }

    function handleFecharModalErro() {
        setExibirModalErro(false);
    }



    return (
        <span>
            <Button variant="danger"
                className="btn-sm"
                onClick={handleAbrirModal}
                data-testid="btn-abrir-modal">
                    <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header>
                    <Modal.Title>Remover tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a seguinte tarefa?
                    <br/>
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                        onClick={handleRemoverTarea}
                        data-testid="btn-remover">
                            Sim
                    </Button>
                    <Button variant="light"
                        onClick={handleFecharModal}>
                            Não
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
                <Modal.Header>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao remover a tarefa, tente remover em instantes.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
}

RemoverTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefa;