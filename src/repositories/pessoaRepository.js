// Arquivo: src/repositories/pessoaRepository.js

// ACOPLAMENTO: Importa a conexão com o banco
const pool = require('../config/db');

// Busca todas as pessoas
const getAllPessoas = async () => {
    const sql = 'SELECT * FROM pessoas';
    const resultado = await pool.query(sql);
    return resultado.rows;
};

// Busca uma pessoa específica pelo ID
const getPessoaById = async (id) => {
    const sql = 'SELECT * FROM pessoas WHERE id = $1';
    const resultado = await pool.query(sql, [id]);
    return resultado; // Retorna o objeto completo para validarmos depois
};

// Busca uma pessoa específica pelo CPF
const getPessoaByCpf = async (cpf) => {
    const sql = 'SELECT * FROM pessoas WHERE cpf = $1';
    const resultado = await pool.query(sql, [cpf]);
    return resultado;
};

// Cria uma nova pessoa (incluindo cpf e senha)
const createPessoa = async (nome, email, telefone, cpf, senha) => {
    const sql = 'INSERT INTO pessoas (nome, email, telefone, cpf, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const resultado = await pool.query(sql, [nome, email, telefone, cpf, senha]);
    return resultado.rows[0];
};

// ACOPLAMENTO: Exporta as funções
module.exports = {
    getAllPessoas,
    getPessoaById,
    getPessoaByCpf,
    createPessoa
};