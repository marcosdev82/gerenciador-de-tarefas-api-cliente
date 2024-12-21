import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Container, Modal } from "react-bootstrap";
import axios from "axios";

function AtualizarTarefa() {
    const { id } = useParams(); // Obtém o parâmetro `id` da URL
    const navigate = useNavigate();
    const API_URL_TAREFAS = 'http://localhost:4000/gerenciador-tarefas/';

    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);
    const [exibirModalError, setExibirModalErro] = useState(false);

    

    useEffect(() => {
        async function obterTrefa() {
            try {
                let { data } = await axios.get(API_URL_TAREFAS + id);
                console.log(id, data)
                setTarefa(data.nome);
            } catch (err) {
                navigate("/");
            }
        }

        if (carregarTarefa) {
            obterTrefa();
            setCarregarTarefa(false);
        }
    }, [carregarTarefa, id]);

    function atualizar(event) {
        event.preventDefault();
        setFormValidado(true);
       if (event.currentTarget.checkValidity()) {
            // obtém as tarefas
            const tarefaDb = localStorage['tarefas'];
            let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
            // persistir a tarefa atualizada
            tarefas = tarefas.map(tarefaObj => {
                if (tarefaObj.id === parseInt(id, 10)){
                    tarefaObj.nome = tarefa;
                }
                return tarefaObj;
            });
            
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
        
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    function handleFecharModal() {
        navigate("/");
    }

    function handleFecharModalError() {
        setExibirModalErro(false);
    }

    return (
        <Container>
            <h3 className="text-center">Atualizar Tarefa</h3>
            <Container>
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            data-testid="txt-tarefa"
                            value={tarefa || ""}
                            onChange={handleTxtTarefa}
                        />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="success" type="submit" data-testid="btn-atualizar">
                            Atualizar
                        </Button>
                        &nbsp;
                        <Button variant="light" onClick={() => navigate("/")}>
                            Voltar
                        </Button>
                    </Form.Group>
                </Form>
                <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tarefa atualizada com sucesso!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={exibirModalError} onHide={handleFecharModalError} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Erro ao atualizar tarefa, tente novamente em instates.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="warning"
                            onClick={handleFecharModalError}
                            >
                                Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Container>
    );
}

export default AtualizarTarefa;