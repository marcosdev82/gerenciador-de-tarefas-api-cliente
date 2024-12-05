import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Ordenacao(props) {
    // Funções corrigidas para retornar o valor esperado
    function handleAscDesc() {
        return (props.ordenarAsc || props.ordenarDesc) ? 'hidden' : '';
    }

    function handleAsc() {
        return props.ordenarAsc ? '' : 'hidden';
    }

    function handleDesc() {
        return props.ordenarDesc ? '' : 'hidden';
    }

    return (
        <span>
            <FontAwesomeIcon 
                icon={faSort}
                className={handleAscDesc()} // Invoca a função
                data-testid="faSort"
            />
            <FontAwesomeIcon 
                icon={faSortUp}
                className={handleAsc()} // Invoca a função
                data-testid="faSortUp"
            />
            <FontAwesomeIcon 
                icon={faSortDown}
                className={handleDesc()} // Invoca a função
                data-testid="faSortDown"
            />
        </span>
    );
}

// Validação de tipos das props
Ordenacao.propTypes = {
    ordenarAsc: PropTypes.bool.isRequired,
    ordenarDesc: PropTypes.bool.isRequired,
};

export default Ordenacao;
