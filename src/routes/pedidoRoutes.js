// Arquivo: src/routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Lista todos os pedidos
router.get('/', pedidoController.listarPedidos);

// Lista pedidos de um cliente específico (Ex: GET /pedidos/pessoa/1)
router.get('/pessoa/:pessoa_id', pedidoController.buscarPedidosPorPessoa);

// Cria um novo pedido
router.post('/', pedidoController.criarPedido);

module.exports = router;