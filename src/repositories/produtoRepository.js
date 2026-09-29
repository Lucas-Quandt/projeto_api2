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

// Atualiza um produto existente (Note o RETURNING *)
const updateProduto = async (id, nome, preco, descricao) => {
    const sql = 'UPDATE produtos SET nome = $1, preco = $2, descricao = $3 WHERE id = $4 RETURNING *';
    const resultado = await pool.query(sql, [nome, preco, descricao, id]);
    return resultado; 
};

// Deleta um produto (Note o RETURNING *)
const deleteProduto = async (id) => {
    const sql = 'DELETE FROM produtos WHERE id = $1 RETURNING *';
    const resultado = await pool.query(sql, [id]);
    return resultado;
};

module.exports = {getAllProdutos, getProdutosByID, createProduto, updateProduto, deleteProduto};