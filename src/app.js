const express = require('express');

const cors = require ('cors');

const produtosRoutes = require('./routes/produtoRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/produtos', produtosRoutes);
app.use('/pessoas', pessoaRoutes);

module.exports = app;