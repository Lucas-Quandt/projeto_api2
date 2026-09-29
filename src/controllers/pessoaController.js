// ACOPLAMENTO: O Controller importa o Repository
const PessoaRepository = require('../repositories/pessoaRepository');

const listarPessoas = async (req, res) => {
    try {
        const pessoas = await PessoaRepository.getAllPessoas();
        res.json(pessoas);
    } catch (erro) {
        console.error('Erro ao buscar pessoas:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno ao buscar pessoas' });
    }
};

const buscarPessoaPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await PessoaRepository.getPessoaById(id);
        
        // Verifica se o banco encontrou alguém
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Pessoa não encontrada pelo ID' });
        }
        
        res.json(resultado.rows[0]); 
    } catch (erro) {
        console.error('Erro ao buscar pessoa por ID:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
};

const buscarPessoaPorCpf = async (req, res) => {
    try {
        // Pega o CPF que o usuário digitou na URL
        const cpf = req.params.cpf;
        const resultado = await PessoaRepository.getPessoaByCpf(cpf);
        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Pessoa não encontrada pelo CPF' });
        }
        
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error('Erro ao buscar pessoa por CPF:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
};

const criarPessoa = async (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        const { nome, email, telefone, cpf, senha } = req.body;
        
        // Validação simples
        if (!nome || !email || !cpf || !senha) {
            return res.status(400).json({ mensagem: 'Nome, email, CPF e senha são obrigatórios' });
        }

        const novaPessoa = await PessoaRepository.createPessoa(nome, email, telefone, cpf, senha);
        res.status(201).json(novaPessoa);
    } catch (erro) {
        console.error('Erro ao criar pessoa:', erro.message);
        
        // O código 23505 é o erro padrão do PostgreSQL para violação de regra UNIQUE
        if (erro.code === '23505') {
            return res.status(400).json({ mensagem: 'Este email ou CPF já está cadastrado' });
        }
        res.status(500).json({ mensagem: 'Erro ao cadastrar pessoa' });
    }
};

// ACOPLAMENTO: Exporta o controlador
module.exports = {
    listarPessoas,
    buscarPessoaPorId,
    buscarPessoaPorCpf,
    criarPessoa
};