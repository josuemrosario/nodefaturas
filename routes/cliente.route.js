const express = require('express');
const router = express.Router();
const {
    mostrarClientes,
} = require('../controllers/cliente.controller');

router.get('/', mostrarClientes);
module.exports = router;