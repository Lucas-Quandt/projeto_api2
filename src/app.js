const express = require('express');

const cors = require ('cors');

const produtosRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/produtos', produtosRoutes);

module.exports = app;