const express = require('express');
const router = express.Router();

// ACOPLAMENTO: Importamos o Controller de Pessoas
const pessoaController = require('../controllers/pessoaController');

// Define as rotas HTTP e aponta para o controller
router.get('/', pessoaController.listarPessoas);

// URL: http://localhost:3000/pessoas/1
router.get('/:id', pessoaController.buscarPessoaPorId);

// URL: http://localhost:3000/pessoas/cpf/123.456.789-00
// Usamos /cpf/:cpf para não confundir com a busca por ID
router.get('/cpf/:cpf', pessoaController.buscarPessoaPorCpf);

// URL: http://localhost:3000/pessoas
router.post('/', pessoaController.criarPessoa);

// ACOPLAMENTO: Exporta o router
module.exports = router;