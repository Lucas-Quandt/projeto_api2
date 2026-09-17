const pool = require('../config/db');

const getAllProdutos = async ()=> {
    const sql = 'SELECT * FROM produtos';
    const resultado = await pool.query(sql);
    return resultado;
}

module.exports = getAllProdutos;