const ProdutoRepository = require('../repositories/produtoRepository');

const listarProdutos = async (request, response) => {
    console.log("cheguei no controller")
    try{
        const resultado = await ProdutoRepository.getAllProdutos();
        console.log(resultado);
        response.json(resultado);
    }catch(erro){
        console.error(erro.message)
        response.status(500).json({mensagem:'Error Interno.'});   
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

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto
};