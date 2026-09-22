const pool = require('../config/db');

const getAllProdutos = async ()=> {
    const sql = 'SELECT * FROM produtos';
    const resultado = await pool.query(sql);
    return resultado.rows;
};

const getProdutosByID = async (id)=>{
    const sql = 'SELECT * FROM produtos WHERE id = $1';
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];

};

const createProduto = async (nome, preco, descricao) => {
    const sql = 'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *';
    const resultado = await pool.query(sql, [nome, preco, descricao]);
    return resultado.rows[0];
};

module.exports = {getAllProdutos, getProdutosByID, createProduto};