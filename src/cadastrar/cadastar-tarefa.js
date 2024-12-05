import React, { useState } from 'react';
import { Button, Form, Modal, Container, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Tarefa from '../models/tarefa.model';

function CadastrarTarefa() {

    const [tarefa, setTarefa] = useState('');
    const [formValidate, setFormValidate] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);
    const navigate = useNavigate(); // Inicializa o hook para navegação

    function cadastrar(event) {
        event.preventDefault();
        setFormValidate(true);
        if (event.currentTarget.checkValidity() === true) {
            // Obtém as tarefas
            const tarefasDb = localStorage['tarefas'];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            // Persiste a tarefa
            tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    function handleFecharModal() {
        setExibirModal(false); // Fecha o modal antes de redirecionar
        navigate('/'); // Redireciona para a página inicial
    }

    return (
        <Container className="my-5">
            <h3 className='text-center'>Cadastrar</h3>
            <Card className="p-5">
                <Card.Body> 
                    <Form
                        validated={formValidate}
                        noValidate
                        onSubmit={cadastrar}
                    >
                        <Form.Group>
                            <Form.Label>Tarefa</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Digite a tarefa'
                                minLength='5'
                                maxLength='100'
                                required
                                value={tarefa}
                                onChange={handleTxtTarefa}
                                data-testid="txt-tarefa" // Adicionado para o teste
                            />
                            <Form.Control.Feedback type="invalid">
                                A tarefa deve conter ao menos 5 caracteres.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="my-2 text-center">
                            <Button 
                                variant='success'
                                type='submit'
                                data-testid="btn-cadastrar" // Adicionado para o teste
                            >
                                Cadastrar
                            </Button>
                            
                            <Link to='/' className='btn btn-light'>
                                Voltar
                            </Link>
                        </Form.Group>
                    </Form>
                    <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                        <Modal.Header closeButton>
                            <Modal.Title>Sucesso</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tarefa adicionada com sucesso!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant="success"
                                onClick={handleFecharModal}
                            >
                                Continuar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card> 
        </Container>
    );
}

export default CadastrarTarefa;
