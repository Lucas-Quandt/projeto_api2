const ProdutoRepository = require('../repositories/produtoRepository');

const listarProdutos = async (req, res) => {
    try {
        // Captura da URL: http://localhost:3000/produtos?page=1&limit=10
        // Se o usuário não mandar nada, o padrão será página 1, com 10 itens.
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Matemática da paginação: (página - 1) * limite
        const offset = (page - 1) * limit;

        const produtos = await ProdutoRepository.getAllProdutos(limit, offset);
        
        // Retornamos um objeto mais rico, avisando o usuário em qual página ele está
        res.json({
            paginaAtual: page,
            itensPorPagina: limit,
            quantidadeRetornada: produtos.length,
            dados: produtos
        });
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
};

// Buscar por ID
const buscarProdutoPorId = async (request, response) => {
    try {
        const { id } = request.params;
        const produto = await ProdutoRepository.getProdutosByID(id);

        if (!produto) {
            return response.status(404).json({ mensagem: 'Produto não encontrado.' });
        }

        return response.json(produto);
    } catch (erro) {
        console.error(erro.message);
        return response.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
};

// Criar produto 
const criarProduto = async (request, response) => {
    try {
        const { nome, preco, descricao } = request.body;

        if (!nome || preco === undefined) {
            return response.status(400).json({ mensagem: 'Nome e preço são obrigatórios.' });
        }

        const novoProduto = await ProdutoRepository.createProduto(nome, preco, descricao);
        return response.status(201).json(novoProduto);
    } catch (erro) {
        console.error(erro.message);
        return response.status(500).json({ mensagem: 'Erro interno ao cadastrar produto.' });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Tenta converter o ID da URL para número
        
        // 1ª Barreira: Verifica se o ID é realmente um número válido
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'O ID informado na URL é inválido.' });
        }

        const { nome, preco, descricao } = req.body;
        
        // 2ª Barreira: Impede a atualização incompleta
        if (!nome || !preco || !descricao) {
            return res.status(400).json({ 
                mensagem: 'Para atualizar, você deve enviar nome, preco e descricao obrigatoriamente.' 
            });
        }
        
        const resultado = await ProdutoRepository.updateProduto(id, nome, preco, descricao);
        
        // 3ª Barreira: Verifica se o produto realmente existia no banco
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado no banco de dados.' });
        }
        
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar' });
    }
};

const deletarProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ mensagem: 'O ID informado na URL é inválido.' });

        const resultado = await ProdutoRepository.deleteProduto(id);
        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado para exclusão' });
        }
        
        res.json({ 
            mensagem: 'Produto deletado com sucesso', 
            deletado: resultado.rows[0] 
        });
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro ao deletar' });
    }
};

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    deletarProduto
};