const PedidoRepository = require('../repositories/pedidoRepository');

const listarPedidos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const pedidos = await PedidoRepository.getAllPedidos(limit, offset);
        
        res.json({
            paginaAtual: page,
            itensPorPagina: limit,
            quantidadeRetornada: pedidos.length,
            dados: pedidos
        });
    } catch (erro) {
        console.error('Erro ao buscar pedidos:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno ao buscar pedidos' });
    }
};

const buscarPedidosPorPessoa = async (req, res) => {
    try {
        const pessoa_id = req.params.pessoa_id;
        const pedidos = await PedidoRepository.getPedidosByPessoaId(pessoa_id);
        
        if (pedidos.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum pedido encontrado para esta pessoa.' });
        }
        
        res.json(pedidos);
    } catch (erro) {
        console.error('Erro ao buscar pedidos por pessoa:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno ao buscar pedidos' });
    }
};

const criarPedido = async (req, res) => {
    try {
        const { pessoa_id, produto_id, quantidade } = req.body;
        
        // Valida se os dados chegaram
        if (!pessoa_id || !produto_id || !quantidade) {
            return res.status(400).json({ mensagem: 'pessoa_id, produto_id e quantidade são obrigatórios' });
        }

        // Valida a quantidade
        if (quantidade <= 0) {
            return res.status(400).json({ mensagem: 'A quantidade deve ser maior que zero' });
        }

        const novoPedido = await PedidoRepository.createPedido(pessoa_id, produto_id, quantidade);
        res.status(201).json(novoPedido);
    } catch (erro) {
        console.error('Erro ao criar pedido:', erro.message);
        
        // O código 23503 é o erro do PostgreSQL para Violação de Chave Estrangeira
        // Isso acontece se o usuário tentar comprar com um pessoa_id ou produto_id que não existe.
        if (erro.code === '23503') {
            return res.status(404).json({ mensagem: 'A pessoa ou o produto informado não existe.' });
        }
        res.status(500).json({ mensagem: 'Erro ao cadastrar pedido' });
    }
};

module.exports = {
    listarPedidos,
    buscarPedidosPorPessoa,
    criarPedido
};